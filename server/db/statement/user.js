export const insertUser = (props) => {
    const sql = `INSERT INTO info(idUser,name,phone,email,address,area)VALUES
    ('${props.idUser}','${props.name}','${props.phone}','${props.email}','${props.address}','${props.area}');`
    return sql;
}