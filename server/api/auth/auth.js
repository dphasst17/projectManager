import express from "express";
import dotenv from "dotenv";
import { poolConnectDB } from "../../db/db.js";
import * as sqlQuery from "../../db/statement/auth.js";
import * as response from "../../utils/handle.js";
import * as message from "../../utils/message.js"
import { verify,handleRoleAdmin } from "../../middleware/index.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { insertUser, insertUserPosition } from "../../db/statement/user.js";
const router = express.Router();
dotenv.config();
const pool = poolConnectDB();

const createToken = (idUser) => {
    const accessToken = jwt.sign({ id: idUser }, process.env.SECRET_KEY, { expiresIn: "1d", });
    const { exp: expAccess } = jwt.decode(accessToken);
    return { accessToken, expAccess}
}
/* Create the new password if user forgot password */
const createPass = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}
const encodePass = (password) => {
    const saltRound = 10
    const salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password, salt);
    
}

const handleRegister = (res,props) => {
    const pass_hash = encodePass(props.password)
    const sql = sqlQuery.register({idUser:props.idUser,username:props.username,pass_hash:pass_hash,role:props.role})
    pool.query(sql, function (err, results) {
        response.errResponseMessage(res,err,500,message.err500Message())
        const data = {
            idUser:props.idUser,
            name:props.name,
            email:props.email
        }
        const sqlUser = insertUser(data)
        const sqlPosition = insertUserPosition(props.idUser,props.position)
        pool.query(sqlUser,(errInsert,resultInsert) => {
            response.errResponseMessage(res,errInsert,500,message.err500Message())

            pool.query(sqlPosition,(errPosition,resultPosition) => {
                response.errResponseMessage(res,errPosition,500,message.err500Message())
                response.successResponseMessage(res,201,message.createItemsMessage('new user'))
            })
        })
    })
}
/* body data : username,password,role,name,email */
router.post('/register', verify, handleRoleAdmin, (req, res) => {
    const data = req.body;
    const sql = sqlQuery.login(data.username)
    pool.query(sql, (err, results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        if (results.length !== 0) {
            res.status(400).json("Username already taken");
            return
        } else {
            handleRegister(res,{idUser:data.username,username:data.username,password:data.password,role:data.role,name:data.name,email:data.email,position:data.position})
           
        }
    })

})

router.post('/login', (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    let isPassword
    const sql = sqlQuery.login(username);
        pool.query(sql, (err, results) => {
            response.errResponseMessage(res,err,500,message.err500Message())
            
            if (results.length === 0) {
                res.status(401).json({status:401,message:"Username does not exist"})
                return
            }
            const pass_hash = results.map(e => e.password).toString()
            isPassword = bcrypt.compareSync(password, pass_hash);

            if (!isPassword) {
                response.successResponseMessage(res,401,'Incorrect password')
                return
            }
            const idUser = results.map(e => e.idUser).toString()
            const role = results.map(e => e.role).toString()
            const resultObj = createToken(idUser)
            resultObj.role = role;
            res.status(200).json(resultObj);
        })

})
router.post('/password',verify,(req,res) => {
    const data = req.body
    const idUser = req.idUser;
    const currentPass = data.current
    const newPass = data.new;
    const pass_hash = encodePass(newPass)
    const sql = sqlQuery.updatePassword(idUser,pass_hash);
    const sqlCheck = sqlQuery.checkPassword(idUser);
    let isPassword;
    pool.query(sqlCheck,(errCheck,resultCheck) => {
        response.errResponseMessage(res,errCheck,500,message.err500Message())
        const pass_hash = resultCheck.map(e => e.password).toString()
        isPassword = bcrypt.compareSync(currentPass, pass_hash);

        if (!isPassword) {
            response.successResponseMessage(res,401,'Incorrect password')
            return
        }

        pool.query(sql,(err,results) => {
            response.errResponseMessage(res,err,500,message.err500Message())
    
            response.successResponseMessage(res,200,'Update password is success')
        })
    })
})
router.post('/forgot', (req, res) => {
    const data = req.body;
    const username = data.username
    const email = data.email;
    const sql = sqlQuery.checkUser(username,email);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        if(results.length === 0){
          response.successResponseMessage(res,401,'Username or email does not exist')
          return
        }
        const newPass = createPass(10)
        const pass_hash = encodePass(newPass)
        const idUser = results[0].idUser
        const setPass = sqlQuery.updatePassword(idUser,pass_hash)
        pool.query(setPass,(errPass,resultPass) => {
            response.errResponseMessage(res,errPass,500,message.err500Message())
            const data = {
                toMail:email,
                subject:"New password",
                content:`New password is ${newPass}`
            }
            response.handleSendMail(res,data)
        })
        

    })

})
export default router;