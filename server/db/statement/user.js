export const insertUser = (props) => {
    const sql = `INSERT INTO info(idUser,name,phone,email,address,area)VALUES
    ('${props.idUser}','${props.name}','${props.phone}','${props.email}','${props.address}','${props.area}');`
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
export const updateUser = (idUser,data) => {
    const sql = `UPDATE info SET name = '${data.name}',phone = '${data.phone}',email = '${data.email}',address = '${data.address}',area = '${data.area}' WHERE  idUser = '${idUser}'`;
    return sql;
}
export const getAll = () => {
    const sql = `SELECT i.idUser,i.name,i.email,i.area,a.role FROM info i LEFT JOIN auth a ON i.idUser = a.idUser WHERE i.idUser != 'leader'`
    return sql
}