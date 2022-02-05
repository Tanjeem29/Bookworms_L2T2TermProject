const db = require('./DB_Basics');

async function getRIDByEmail(email){
    const sql = `
        SELECT 
            *
        FROM 
            READER
        WHERE 
            EMAIL = :email
        `;
    const binds = {
        email : email
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

module.exports = {
    getRIDByEmail
}