import express from "express"
import * as sqlQuery from "../../db/statement/user.js"
import { poolConnectDB } from "../../db/db.js";
import * as response from "../../utils/handle.js"
import * as message from "../../utils/message.js"
import {handleRoleAdmin, verify} from "../../middleware/index.js"
const router = express.Router();
const pool = poolConnectDB()
router.post('/insert',verify,handleRoleAdmin,(req,res) => {
    const data = req.body;
    const sql = sqlQuery.insertUser(data);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        response.successResponseMessage()
    })
})
router.post('/info',verify,(req,res) => {
    const idUser = req.idUser
    const sql = sqlQuery.getUser(idUser)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        const parseData = results.map(e => {
            return {
                ...e,
                position:e.position === null ? "" :e.position,
                task:JSON.parse(e.task) === null ? [] : JSON.parse(e.task)
            }
        })
        response.successResponseData(res,200,parseData)
    })
})
router.put('/update',verify,(req,res) => {
    const idUser = req.idUser;
    const data = req.body;
    const sql = sqlQuery.updateUser(idUser,data);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,message.err500Message())

        response.successResponseMessage(res,200,message.updateItemsMessage('user'))
    })
})
router.put('/update/action',verify,handleRoleAdmin,(req,res) => {
    const data = req.body;
    const sql = sqlQuery.updateAction(data.idUser,data.action);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,message.err500Message())

        response.successResponseMessage(res,200,message.updateItemsMessage(`action for ${data.idUser}`))
    })
})
router.get('/staff',(req,res) => {
    const sql = sqlQuery.getStaff()
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        response.successResponseData(res,200,results)
    })
})
router.post('/all',handleRoleAdmin,(req,res) => {
    const sql = sqlQuery.getStaff();
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,message.err500Message())
    })
})
export default router
