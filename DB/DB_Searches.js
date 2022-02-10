const db = require('./DB_Basics');

async function searchByBookname(strin){
    const sql = `
    Select * from BOOKS b
    where Upper(b.TITLE) like '%' || Upper(:bname) || '%'
    `;
    const binds = {
        bname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchByAuthorname(strin){
    const sql = `
    select * from AUTHOR
    where UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%'
    `;
    const binds = {
        aname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



module.exports = {
    searchByBookname,
    searchByAuthorname
}