export const insertUser = (props) => {
    const sql = `INSERT INTO info(idUser,name,email)VALUES
    ('${props.idUser}','${props.name}','${props.email}');`
    return sql;
}
export const insertUserPosition = (idUser,position) => {
    const sql = `INSERT INTO positions(idUser,positionDetail) VALUES('${idUser}','${position}');`;
    return sql;
}
export const getUser = (idUser) => {
    const sql = `SELECT i.name,i.phone,i.email,i.address,i.area,a.role,(p.positionDetail) AS position,
    (SELECT CONCAT('[',
        GROUP_CONCAT(
            JSON_OBJECT(
                'idProject',p.idProject,'nameProject',p.name,
                'name',t.name,'description',t.description,'startDate',t.startDate,'endDate',t.endDate,'finishDate',t.finishDate,'status',t.status
            )
        ),
    ']') FROM project p LEFT JOIN task t ON p.idProject = t.idProject WHERE t.assignedTo = '${idUser}') AS task
    FROM info i
    LEFT JOIN auth a on i.idUser = a.idUser
    LEFT JOIN positions p ON i.idUser = p.idUser
    WHERE i.idUser = '${idUser}'`;
    return sql;
}
export const updateUser = (isAdmin,idUser,data) => {
    const result = isAdmin === true ? `area = '${data.area}'` 
        : `name = '${data.name}',phone = '${data.phone}',email = '${data.email}',address = '${data.address}'`
    const sql = `UPDATE info SET ${result} WHERE  idUser = '${idUser}'`;
    return sql;
}
export const updateAction = (idUser,newAction) => {
    const sql = `UPDATE info SET action = '${newAction}' WHERE idUser = '${idUser}';`;
    return sql;
}
export const updateActionInList = (listUser,newAction) => {
    const sql = `UPDATE info SET action = '${newAction}' WHERE idUser IN (${listUser.map(e => `'${e.idUser}'`)});`;
    return sql;
}
export const getStaff = () => {
    const sql = `SELECT i.idUser,i.name,i.email,i.area,a.role,p.positionDetail AS position,i.action
    FROM info i 
    LEFT JOIN auth a ON i.idUser = a.idUser 
    LEFT JOIN positions p ON i.idUser = p.idUser
    `
    return sql
}