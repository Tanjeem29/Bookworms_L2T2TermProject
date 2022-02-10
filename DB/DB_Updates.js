const db = require('./DB_Basics');

async function updateReaderByID(id, uname, pass, fname, lname, bio){
    const sql = `
    UPDATE READER R
    SET
    USERNAME = :uname,
    PASSWORD = :pass,
    FIRST_NAME = :fname,
    LAST_NAME = :lname,
    BIO = :bio
    WHERE R.READER_ID = :id
    `;
    const binds = {
        id : id,
        uname : uname,
        pass : pass,
        fname : fname,
        lname : lname,
        bio : bio
    }

    return (await db.execute(sql, binds, db.options));
}


module.exports =
{ 
    updateReaderByID
}