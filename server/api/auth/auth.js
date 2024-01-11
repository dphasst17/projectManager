import express from "express";
import dotenv from "dotenv";
import { poolConnectDB } from "../../db/db.js";
import * as sqlQuery from "../../db/statement/auth.js";
import { verify,handleRoleAdmin } from "../../middleware/index.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router = express.Router();
dotenv.config();
const pool = poolConnectDB();

/* const updateLogin = (idUser, token) => {
    const sql = `UPDATE login SET rfToken = '${token}' WHERE idUser = '${idUser}'`;
    pool.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({
                status:500,
                message: "A server error occurred. Please try again in 5 minutes." 
            });
            return;
        }
    })
} */
const createToken = (idUser) => {
    const accessToken = jwt.sign({ id: idUser }, process.env.SECRET_KEY, { expiresIn: "1d", });
    const { exp: expAccess } = jwt.decode(accessToken);
    /* updateLogin(idUser, refreshToken); */
    return { accessToken, expAccess}
}


const handleRegister = (res,props) => {
    const saltRound = 10
    const salt = bcrypt.genSaltSync(saltRound);
    const pass_hash = bcrypt.hashSync(props.password, salt);
    const sql = sqlQuery.register({idUser:props.idUser,username:props.username,pass_hash:pass_hash,role:props.role})
    pool.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({
                status:500,
                message: "A server error occurred. Please try again in 5 minutes." 
            });
            return;
        }
        const {accessToken,expAccess} = createToken(props.username)
        res.json({accessToken,expAccess})
        /* let insertData = props[2] === "u" ? sqlQuery.insertUserTypeU(props[0]) : sqlQuery.insertUserTypeE(props[4], props[3], props[0])
        pool.query(insertData, function (err, result) {
            if (err) throw err
            const {accessToken,expAccess} = createToken(props.username)
        }) */
    })
}

router.post('/register', verify, handleRoleAdmin, (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const role = data.role;
    const sql = sqlQuery.login(username)
    pool.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({
                err1:err,
                status:500,
                message: "A server error occurred. Please try again in 5 minutes." 
            });
            return;
        }
        if (results.length !== 0) {
            res.status(400).json("Username already taken");
            return
        } else {
            handleRegister(res,{idUser:username,username:username,password:password,role:role})
           
        }
    })

})

router.post('/login', (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    let isPassword
    const sql = sqlQuery.login(username);
        pool.query(sql, function (err, results) {
            if (err) {
                res.status(500).json({
                    status:500,
                    message: "A server error occurred. Please try again in 5 minutes." 
                });
                return;
            }
            if (results.length === 0) {
                res.status(401).json("Username does not exist")
            }
            const pass_hash = results.map(e => e.password).toString()
            isPassword = bcrypt.compareSync(password, pass_hash);

            if (!isPassword) {
                res.status(401).json("Incorrect Password")
                return
            }
            console.log(results)
            const idUser = results.map(e => e.idUser).toString()
            const role = results.map(e => e.role).toString()
            const resultObj = createToken(idUser)
            resultObj.role = role;
            res.status(200).json(resultObj);
        })

})

router.post('/new/token', verify, (req, res) => {
    const result = req.idUser;
    const rfToken = req.headers['authorization'];
    const idUser = result.split("-")[0]
    let checkToken = false;
    const sql = `SELECT rfToken FROM login WHERE idUser = '${idUser}'`;
    pool.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({
                status:500,
                message: "A server error occurred. Please try again in 5 minutes." 
            });
            return;
        }
        results.map(e => {
            if (rfToken.includes(e.rfToken)) {
                checkToken = true
            }
        })
        if (checkToken === true) {
            const accessToken = jwt.sign({ id: idUser }, process.env.SECRET_KEY, { expiresIn: "600s", });
            const { exp: expAccess } = jwt.decode(accessToken);
            res.json({ accessToken, expAccess })
        }
    })

})
router.post('/forgot', (req, res) => { })
export default router;