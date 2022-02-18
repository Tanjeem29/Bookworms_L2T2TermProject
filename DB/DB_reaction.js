const db = require('./DB_Basics');

async function getReactionStatus(wallpostID, userID){
    const sql = `
    SELECT COUNT(*) STATUS
    FROM REACTION 
    WHERE WALLPOST_ID = :wallID AND READER_ID = :RID
    `;
    const binds = {
        RID : userID,
        wallID : wallpostID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getReactionCount(wallpostID){
    const sql = `
    SELECT LIKE_COUNT
    FROM WALLPOST 
    WHERE WALLPOST_ID = :wallID
    `;
    const binds = {
        wallID : wallpostID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function insertReactionStatus(wallpostID, userID) {
    const sql = `
    INSERT INTO REACTION
    (WALLPOST_ID, READER_ID, DATED) 
    VALUES 
    (:wallID, :RID, SYSDATE)
    `;

    const binds = {
        RID : userID,
        wallID : wallpostID
    }

    return await db.execute(sql, binds, db.options);
}

async function deleteReactionStatus(wallpostID, userID) {
    const sql = `
    DELETE FROM REACTION
    WHERE READER_ID = :usr AND WALLPOST_ID = :wallID
    `;

    const binds = {
        wallID : wallpostID,
        usr : userID
    }

    return await db.execute(sql, binds, db.options);
}

module.exports = {
    getReactionStatus,
    insertReactionStatus,
    deleteReactionStatus,
    getReactionCount
}