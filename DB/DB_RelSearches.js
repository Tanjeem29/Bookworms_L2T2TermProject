const db = require('./DB_Basics');

async function getAuthorByBookID(strin){
    const sql = `
    SELECT * 
    FROM AUTHOR A NATURAL JOIN WRITTEN_BY W
    WHERE W.BOOK_ID = :BookID
    `;
    const binds = {
        BookID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getReadStatusForBook(RID, BID){
    const sql = `
    SELECT * 
    FROM READ_STATUS RS
    WHERE RS.BOOK_ID = :BID AND RS.READER_ID = :RID
    `;
    const binds = {
        BID : BID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


module.exports ={
    getAuthorByBookID,
    getReadStatusForBook
}