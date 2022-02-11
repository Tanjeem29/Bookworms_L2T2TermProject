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


async function updateReadStatus(RID, BID, NRS){
    const sql = `
    UPDATE READ_STATUS RS
    SET
    STATUS = :NRS,
    DATED = SYSDATE
    WHERE RS.READER_ID = :RID AND RS.BOOK_ID = :BID
    `;
    const binds = {
        RID : RID,
        BID : BID,
        NRS : NRS
    }

    return (await db.execute(sql, binds, db.options));
}


module.exports =
{ 
    updateReaderByID,
    updateReadStatus
}