export const register = (data) => {
    const sql = `INSERT INTO auth (idUser,username,password,role,action,refreshToken)VALUES
    ('${data.idUser}','${data.username}','${data.pass_hash}','${data.role}','activated','')`;
    return sql;
}
export const login = (username) => {
    const sql = `SELECT idUser,password,role FROM auth WHERE username = '${username}';`;
    return sql;
}
export const checkUser = (username,email) => {
    const sql = `SELECT a.idUser, a.username,i.email FROM auth a LEFT JOIN info i ON a.idUser = i.idUser WHERE a.username = '${username}' AND i.email = '${email}'`;
    return sql;
}
export const checkRole = (idUser,role) => {
    const sql = `SELECT role FROM auth WHERE role = '${idUser}' AND role = '${role}';`;
    return sql;
}
export const updatePassword = (idUser,newPass) => {
    const sql = `UPDATE auth SET password = '${newPass}' WHERE idUser = '${idUser}';`
    return sql;
}