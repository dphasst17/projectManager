export const register = (data) => {
    const sql = `INSERT INTO auth (idUser,username,password,role,action,refreshToken)VALUES
    ('${data.idUser}','${data.username}','${data.pass_hash}','${data.role}','activated','')`;
    return sql;
}
export const login = (username) => {
    const sql = `SELECT idUser,password,role FROM auth WHERE username = '${username}';`;
    return sql;
}
export const updateRfToken = (username,token) => {
    const sql = `UPDATE auth SET refreshToken = '${token}' WHERE username = '${username}';`;
    return sql;
}
export const checkRole = (idUser,role) => {
    const sql = `SELECT role FROM auth WHERE role = '${idUser}' AND role = '${role}';`;
    return sql;
}