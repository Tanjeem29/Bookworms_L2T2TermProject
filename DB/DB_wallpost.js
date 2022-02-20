const db = require('./DB_Basics');

async function insertWallPost(wallpost) {
    const sql = `
        INSERT INTO WALLPOST 
        (POST_BODY, DATED, POSTED_BY_ID)
        VALUES 
        (:POST_BODY, SYSDATE, :USERID)
    `;
    const binds = {
        POST_BODY : wallpost.postBody,
        USERID : wallpost.uid
    }

    return await db.execute(sql, binds, db.options);
}

async function fetchWallPost(strin){
    const sql = `
    SELECT R.USERNAME, WALLPOST_ID, DATED, POST_BODY, LIKE_COUNT, POSTED_BY_ID, TIMEDIFF(DATED) as TIMEDIF
    FROM 
    (
        (SELECT *
        FROM WALLPOST
        WHERE POSTED_BY_ID = :RID)
            UNION 
        (SELECT * 
        FROM WALLPOST W
        WHERE W.POSTED_BY_ID 
        IN 
        (
            SELECT F.READER_ID 
            FROM FOLLOWER_READER F
            WHERE F.FOLLOWER_ID = :RID
        )
        )
    )
        JOIN READER R ON R.READER_ID = POSTED_BY_ID 
        ORDER BY DATED DESC
    `;
    const binds = {
        RID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function deleteWallpostByID(wid) {
    const sql = `
        DELETE FROM WALLPOST
        WHERE WALLPOST_ID = :WID
    `;
    const binds = {
        WID : wid
    }

    return await db.execute(sql, binds, db.options);
}



module.exports = {
    insertWallPost,
    fetchWallPost,
    deleteWallpostByID
};