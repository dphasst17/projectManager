export const getAllProject = (filter) => {
    const sql = `SELECT idProject,name,startDate,endDate,expense,spent,teamSize,totalTask,projectStatus 
    FROM project ${filter?.isFil === true ? `WHERE endDate LIKE '${filter.year}%'` : ''}`;
    return sql;
}
export const getProjectDetail = (idProject) => {
    const sql = `SELECT p.idProject, p.name, p.startDate, p.endDate, p.expense, p.spent, p.teamSize, p.totalTask, p.projectStatus, 
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            DISTINCT JSON_OBJECT('staff',i.name,'role',d.role,'action',d.action)
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
export const getProjectByStaff = (idStaff) => {
    const sql = `SELECT p.idProject,p.name,p.startDate,p.endDate,p.expense,p.spent,p.teamSize,p.totalTask,p.projectStatus 
    FROM project p 
    LEFT JOIN projectDetail d ON p.idProject = d.idProject
    LEFT JOIN info i ON d.idUser = i.idUser
    WHERE i.idUser = '${idStaff}'`;
    return sql;
}
export const getAllTask = () => {
    const sql = ``;
    return sql;
}
export const getTaskByProject = () => {
    const sql = ``;
    return sql;
}
export const getTaskByStaff = () => {
    const sql = ``;
    return sql;
}
export const getAllExpense = () => {
    const sql = ``;
    return sql;
}
export const insertProject = (data) => {
    const sql = `INSERT INTO project(name,startDate,endDate,expense,teamSize,totalTask)VALUES
    ('${data.name}','${data.start}','${data.end}',${data.expense},${data.teamSize},${data.totalTask});`;
    return sql;
}
export const insertProjectDetail = () => {
    const sql = ``;
    return sql;
}