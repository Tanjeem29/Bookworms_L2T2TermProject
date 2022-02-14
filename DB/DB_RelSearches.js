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


async function getBooksByAuthorID(strin){
    const sql = `
    Select * from 
    (Select * from WRITTEN_BY 
    WHERE AUTHOR_ID = :AID
    ) NATURAL JOIN BOOKS NATURAL JOIN PUBLISHER
    ORDER BY TITLE
    `;
    const binds = {
        AID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getBooksByReaderIDStatus(RID, S){
    const sql = `
    Select * from 
    BOOKS NATURAL JOIN 	
	(SELECT BOOK_ID, STATUS, DATED from READ_STATUS 
	WHERE READER_ID = :RID AND STATUS = :S)
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : RID,
        S : S
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

async function getFollowAuthor(RID, AID){
    const sql = `
    SELECT * 
    FROM FOLLOWER_AUTHOR FA
    WHERE FA.AUTHOR_ID = :AID AND FA.FOLLOWER_ID = :RID
    `;
    const binds = {
        AID : AID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getFollowReader(FID, RID){
    const sql = `
    SELECT * 
    FROM FOLLOWER_READER FR
    WHERE FR.READER_ID = :RID AND FR.FOLLOWER_ID = :FID
    `;
    const binds = {
        FID : FID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


module.exports ={
    getAuthorByBookID,
    getReadStatusForBook,
    getFollowAuthor,
    getBooksByAuthorID,
    getFollowReader,
    getBooksByReaderIDStatus
}