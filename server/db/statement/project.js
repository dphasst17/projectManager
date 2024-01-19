export const getAllProject = (filter) => {
    const sql = `SELECT idProject,name,startDate,endDate,expense,spent,teamSize,totalTask,projectStatus 
    FROM project ${filter?.isFil === true ? `WHERE endDate LIKE '${filter.year}%'` : ''}`;
    return sql;
}
export const getProjectDetail = (idProject) => {
    const sql = `SELECT p.idProject, p.name, p.startDate, p.endDate, p.expense, p.spent, p.teamSize, p.totalTask, p.projectStatus, 
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            DISTINCT JSON_OBJECT('staff',i.name,'role',d.role,'area',i.area,'action',d.action)
        ),
    ']') FROM projectDetail d JOIN info i ON d.idUser = i.idUser WHERE d.idProject = p.idProject) AS teamDetail, 
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            DISTINCT JSON_OBJECT('assigned',t.assignedTo,'nameStaff',i.name,'name',t.name,'description',t.description,'start',t.startDate,'end',t.endDate,'finish',t.finishDate,'status',t.status)
        ),
    ']') FROM task t JOIN info i ON t.assignedTo = i.idUser WHERE t.idProject = p.idProject) AS task 
    FROM project p
    WHERE p.idProject = ${idProject};`;
    return sql;
}
export const getProjectByStatus = (status) => {
    const sql = `SELECT p.idProject, p.name, p.startDate, p.endDate, p.expense, p.spent, p.teamSize, p.totalTask, p.projectStatus, 
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            DISTINCT JSON_OBJECT('staff',i.name,'role',d.role,'area',i.area,'action',d.action)
        ),
    ']') FROM projectDetail d JOIN info i ON d.idUser = i.idUser WHERE d.idProject = p.idProject) AS teamDetail, 
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            DISTINCT JSON_OBJECT('assigned',t.assignedTo,'nameStaff',i.name,'name',t.name,'description',t.description,'start',t.startDate,'end',t.endDate,'finish',t.finishDate,'status',t.status)
        ),
    ']') FROM task t JOIN info i ON t.assignedTo = i.idUser WHERE t.idProject = p.idProject) AS task 
    FROM project p
    WHERE p.projectStatus = '${status}';`;
    return sql;
}
export const getProjectByStaff = (idStaff) => {
    const sql = `SELECT p.idProject,p.name,p.startDate,p.endDate,p.expense,p.spent,p.teamSize,p.totalTask,p.projectStatus 
    FROM project p 
    LEFT JOIN projectDetail d ON p.idProject = d.idProject
    LEFT JOIN info i ON d.idUser = i.idUser
    WHERE i.idUser = '${idStaff}'`;
    return sql;
}

export const getTaskDetail = (idProject) => {
    const sql = `SELECT idProject,COUNT(idProject) AS total,
    CONCAT('[',GROUP_CONCAT(
        JSON_OBJECT('assignTo',assignedTo,'name',name,'description',description,'startDate',startDate,'endDate',endDate,'finishDate',finishDate,'status',status)
        ),']')AS detail 
    FROM task WHERE idProject = ${idProject}`;
    return sql;
}

export const getTaskByStatus = (status) => {
    const sql = `SELECT p.idProject,p.totalTask,
    CONCAT('[',GROUP_CONCAT(JSON_OBJECT('assignedTo',t.assignedTo,'name',t.name,'description',t.description,'start',t.startDate,'endDate',t.endDate,'finishDate',t.finishDate,'status',t.status)),']')AS detail 
    FROM project p 
    LEFT JOIN task t ON p.idProject = t.idProject 
    WHERE projectStatus = '${status}'`;
    return sql;
}

export const getTaskByStaff = (idUser) => {
    const sql = `SELECT idProject,name,description,startDate,endDate,finishDate,status FROM task WHERE assignedTo = '${idUser}'`;
    return sql;
}
export const getAllExpense = () => {
    const sql = `SELECT SUM(expense) AS total, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('idProject',idProject,'expense',expense,'spent',spent)),']') AS detail FROM project`;
    return sql;
}
export const insertProject = (data) => {
    const sql = `INSERT INTO project(name,startDate,endDate,expense,teamSize,totalTask)VALUES
    ('${data.name}','${data.start}','${data.end}',${data.expense},${data.teamSize},${data.totalTask});`;
    return sql;
}
export const insertProjectDetail = (idProject,listUser) => {
    const resultInsert = listUser.map(e => `(${idProject},'${e.idUser}','${e.role}')`)
    const sql = `INSERT INTO projectDetail(idProject,idUser,role)VALUES ${resultInsert}`;
    return sql;
}
export const insertTask = (data) => {
     const sql = `INSERT INTO task(idProject,assignedTo,name,description,startDate,endDate)
     VALUES(${data.idProject},'${data.assigned}','${data.name}','${data.desc}','${data.startDate}','${data.endDate}')`;
     return sql;
}
export const updateStatusTask = (idTask,status) => {
    const sql = `UPDATE task SET status = '${status}' WHERE idTask = ${idTask};`
    return sql;
}

export const updateStatusProjectByDate = (currentDate) => {
    const sql = `UPDATE project SET projectStatus = 'processing' WHERE startDate = '${currentDate}' AND projectStatus = "hasn't started";`;
    return sql;
}