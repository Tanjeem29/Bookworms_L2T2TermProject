const db = require('./DB_Basics');


async function insertReadStatus(RID, BID, RS){
    const sql = `
    INSERT INTO READ_STATUS 
	(READER_ID, BOOK_ID, STATUS, DATED) 
	VALUES 
	(:RID, :BID, :RS, SYSDATE)
    `;
    const binds = {
        RID : RID,
        BID : BID,
        RS: RS
    }

    return (await db.execute(sql, binds, {}));
}

async function insertFollowAuthor(RID, AID){
    const sql = `
    INSERT INTO FOLLOWER_AUTHOR 
	(FOLLOWER_ID, AUTHOR_ID) 
	VALUES 
	(:RID, :AID)
    `;
    const binds = {
        RID : RID,
        AID : AID
    }

    return (await db.execute(sql, binds, {}));
}

async function insertFollowReader(FID, RID){
    const sql = `
    INSERT INTO FOLLOWER_READER 
	(FOLLOWER_ID, READER_ID) 
	VALUES 
	(:FID, :RID)
    `;
    const binds = {
        RID : RID,
        FID : FID
    }

    return (await db.execute(sql, binds, {}));
}

async function insertReaderGenre(RID, GID){
    const sql = `
    INSERT INTO READER_GENRE 
	(GENRE_ID, READER_ID) 
	VALUES 
	(:GID, :RID)
    `;
    const binds = {
        RID : RID,
        GID : GID
    }

    return (await db.execute(sql, binds, {}));
}


module.exports =
{ 
    insertReadStatus,
    insertFollowAuthor,
    insertFollowReader,
    insertReaderGenre
}