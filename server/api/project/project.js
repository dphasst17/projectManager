import express from "express"
import * as sqlQuery from "../../db/statement/project.js"
import { poolConnectDB } from "../../db/db.js";
import * as response from "../../utils/handle.js"
import * as message from "../../utils/message.js"
import * as middle from "../../middleware/index.js"
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
    const sqlTask = sqlQuery.updateStatusTaskByDate(currentDate)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        pool.query(sqlTask,(errTask,resultsTask) => {
            response.errResponseMessage(res,errTask,500,message.err500Message())
            response.successResponseMessage(res,200,message.updateItemsMessage('project status and task status'))
        })
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
router.get('/id/:id',(req,res) => {
    const id = req.params['id']
    const sql = sqlQuery.getProjectById(id);
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
router.post('/staff',middle.verify,(req,res) => {
    const idUser = req.idUser
    const sql = sqlQuery.getProjectByStaff(idUser)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())
        const parseData = results.map(e => {
            return {
                ...e,
                startDate:response.formatDate(e.startDate),
                endDate:response.formatDate(e.endDate),
            }
        })
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
router.post('/task/todo',middle.verify,middle.handleRoleAdmin,(req,res) => {
    const sql = sqlQuery.getTaskToDo()
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        const parseDate = results.map(e => {
            /* const parseDetail = JSON.parse(e.detail) */
            return {
                ...e,
                startDate:response.formatDate(e.startDate),
                endDate:response.formatDate(e.endDate)
            }
        })
        response.successResponseData(res,200,parseDate)
    })
})
router.post('/task/todo/staff',middle.verify,(req,res) => {
    const idUser = req.idUser
    const sql = sqlQuery.staffGetTaskTodo(idUser)
    pool.query(sql,(err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message())

        const parseDate = results.map(e => {
            return {
                ...e,
                startDate:response.formatDate(e.startDate),
                endDate:response.formatDate(e.endDate)
            }
        })
        response.successResponseData(res,200,parseDate)
    })
})
/* {name:name,start:startDate,end:endDate,expense:expense,teamSize:teamSize,totalTask:totalTask,
    detail:[{idUser:user1,role:role1}]} */
router.post('/create',(req,res) => {
    const data = req.body;
    const sql = sqlQuery.insertProject(data);
    pool.query(sql, (err,results) => {
        response.errResponseMessage(res,err,500,message.err500Message());
        const resultId = results.insertId
        const sqlDetail = sqlQuery.insertProjectDetail(resultId,data.detail)
        pool.query(sqlDetail,(errDetail,resultsDetail) => { 
            response.errResponseMessage(res,errDetail,500,message.err500Message());
            response.successResponseMessageAndData(res,201,message.createItemsMessage('project'),{idProject:resultId})
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
router.delete('/',(req,res) => {
    const data = req.body
    const idProject = data.idProject;
    const sqlProject = sqlQuery.deleteProject(idProject);
    const sqlProjectDetail = sqlQuery.deleteProjectDetail(idProject);
    pool.query(sqlProjectDetail,(errDetail,resultDetail) => {
        response.errResponseMessage(res,errDetail,500,message.err500Message());
        pool.query(sqlProject,(err,results) => {
            response.errResponseMessage(res,err,500,message.err500Message());
            response.successResponseMessage(res,200,message.removeItemsMessage('project'))
        })
    })
})


export default router
