const db = require('./DB_Basics');


async function resetReadStatus(RID, BID){
    const sql = `
    DELETE FROM READ_STATUS RS
    WHERE RS.READER_ID = :RID AND RS.BOOK_ID = :BID
    `;
    const binds = {
        RID : RID,
        BID : BID
    }

    return (await db.execute(sql, binds, db.options));
}


module.exports = {
    resetReadStatus
}