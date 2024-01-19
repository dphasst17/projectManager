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
router.post('/update/status/auto',(req,res) => {
    const currentDate = new Date().toLocaleDateString().split("/").reverse().join("-")
    const sql = sqlQuery.updateStatusProjectByDate(currentDate)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        response.successResponseMessage(res,200,message.updateItemsMessage('status in project'))
    })
})
router.get('/status/:statusProject',(req,res) => {
    const status = req.params['statusProject']
    const sql = sqlQuery.getProjectByStatus(status);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        const parseData = results.map(e => {
            const task = JSON.parse(e.task)
            const team = JSON.parse(e.teamDetail)
            return {
                ...e,
                startDate:response.formatDate(e.startDate),
                endDate:response.formatDate(e.endDate),
                task: task === null ? [] : task.map(e => {return{
                    ...e,
                    start:response.formatDate(e.start),
                    end:response.formatDate(e.end),
                    finish:response.formatDate(e.finish),
                }}),
                teamDetail:team === null ? [] : team,
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
router.get('/expense',(req,res) => {
    const sql = sqlQuery.getAllExpense()
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        const parseData = results.map(e => {
            return {
                ...e,
                detail: JSON.parse(e.detail)
            }
        })
        response.successResponseData(res,200,parseData)
    })
})
router.get('/task/status/:statusDetail',(req,res) => {
    const status = req.params['statusDetail']
    const sql = sqlQuery.getTaskByStatus(status);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        const parseDate = results.map(e => {
            const parseDetail = JSON.parse(e.detail)
            return {
                ...e,
                detail:parseDetail.every(c => Object.values(c).every(value => value === null)) ? [] : parseDetail,
            }
        })
        response.successResponseData(res,200,parseDate)
    })
})
/* {name:name,start:startDate,end:endDate,expense:expense,teamSize:teamSize,totalTask:totalTask,detail:[{idUser:user1,role:role1}]} */
router.post('/create',(req,res) => {
    const data = req.body;
    const sql = sqlQuery.insertProject(data);
    pool.query(sql, (err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message());
        const resultId = results.insertId
        const sqlDetail = sqlQuery.insertProjectDetail(resultId,data.detail)
        pool.query(sqlDetail,(errDetail,resultsDetail) => {
            response.errResponseMessage(res,errDetail,500,message.err500Message());
            response.successResponseMessage(res,201,message.createItemsMessage('project'))
        })
    })

})
/* idProject,detail:[{}] detail : assignedTo,name,description,startDate,endDate */
router.post('/create/task',(req,res) => {
    const data = req.body;
    const sql = sqlQuery.insertTask(data.idProject,data.detail);
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message());
        response.successResponseMessage(res,201,message.createItemsMessage('task'))
    })
})


export default router
