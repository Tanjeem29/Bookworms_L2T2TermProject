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

async function resetFollowAuthor(RID, AID){
    const sql = `
    DELETE FROM FOLLOWER_AUTHOR FA
    WHERE FA.FOLLOWER_ID = :RID AND FA.AUTHOR_ID = :AID
    `;
    const binds = {
        RID : RID,
        AID : AID
    }

    return (await db.execute(sql, binds, db.options));
}

async function resetFollowReader(FID, RID){
    const sql = `
    DELETE FROM FOLLOWER_READER FR
    WHERE FR.FOLLOWER_ID = :FID AND FR.READER_ID = :RID
    `;
    const binds = {
        RID : RID,
        FID : FID
    }

    return (await db.execute(sql, binds, db.options));
}

module.exports = {
    resetReadStatus,
    resetFollowAuthor,
    resetFollowReader
}