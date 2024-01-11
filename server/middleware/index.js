import jwt from "jsonwebtoken";
import { poolConnectDB } from "../db/db.js";
import { checkRole } from "../db/statement/auth.js";
const pool = poolConnectDB();
export const verify  = (req,res,next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(" ")[1];
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) res.sendStatus(403);
        req.idUser = data.id;
        next();
    });
}
export const handleRoleAdmin = (req,res,next) => {
    const idUser = req.idUser;
    const sql = checkRole(idUser,'admin')
    pool.query(sql,function(err,result){
        if(err){
            res.status(500).json({status:500, message:'Server error'});
            return;
        }
        
        if(result.length === 0){
            res.status(403).json({message:'You do not have sufficient permissions to access this resource'})
            return;
        }
        next()
    })
}