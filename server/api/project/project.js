import express from "express"
import * as sqlQuery from "../../db/statement/project.js"
import { poolConnectDB } from "../../db/db.js";
import * as response from "../../utils/handle.js"
import * as message from "../../utils/message.js"
const router = express.Router();
const pool = poolConnectDB()
router.get('/',(req,res) => {
    const sql = sqlQuery.getAllProject();
    pool.query(sql,(err,results) => {
      response.errResponseMessage(res,err,500,message.err500Message())
      const parseData = results.map(e => {
        return {
            ...e,
            startDate:response.formatDate(e.startDate),
            endDate:response.formatDate(e.endDate)
        }
      })
      response.successResponseData(res,200,parseData)
        
    })

})
router.get('/filter/:year',(req,res) => {
    const year = req.params['year']
    const sql = sqlQuery.getAllProject({isFil:true,year:year});
    pool.query(sql,(err,results) => {
      response.errResponseMessage(res,err,500,message.err500Message())
      const parseData = results.map(e => {
        return {
            ...e,
            startDate:response.formatDate(e.startDate),
            endDate:response.formatDate(e.endDate)
        }
      })
      response.successResponseData(res,200,parseData)
        
    })

})
router.get('/detail/:idProject',(req,res) => {
    const idProject = req.params['idProject']
    const sql = sqlQuery.getProjectDetail(idProject)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        const parseData = results.map(e => {return {
            ...e,
            startDate:response.formatDate(e.startDate),
            endDate:response.formatDate(e.endDate),
            teamDetail:JSON.parse(e.teamDetail),
            task:JSON.parse(e.task).map(t => {
                return {
                    ...t,
                    end:response.formatDate(t.end),
                    start:response.formatDate(t.start),
                    finish:response.formatDate(t.finish)
                }
            })
        }})
        response.successResponseData(res,200,parseData)
    })
})
router.post('/insert',(req,res) => {

})
export default router
