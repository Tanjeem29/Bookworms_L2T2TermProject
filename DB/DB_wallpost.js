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

async function fetchWallPost2(strin){
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
    ) W
        JOIN READER R ON R.READER_ID = POSTED_BY_ID 
        ORDER BY DATED DESC
    `;
    const binds = {
        RID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



async function fetchWallPost(strin){
    const sql = `SELECT R.USERNAME, WALLPOST_ID, DATED, POST_BODY, LIKE_COUNT, POSTED_BY_ID, TIMEDIFF(DATED) as TIMEDIF
    FROM 
    (SELECT WALLPOST_ID, W.DATED, POST_BODY, COUNT(R2.READER_ID) LIKE_COUNT, POSTED_BY_ID FROM
        (
					(SELECT *
					FROM WALLPOST
					WHERE POSTED_BY_ID = :RID)
							UNION 
					(SELECT * 
					FROM WALLPOST W2
					WHERE W2.POSTED_BY_ID 
					IN 
					(
							SELECT F.READER_ID 
							FROM FOLLOWER_READER F
							WHERE F.FOLLOWER_ID = :RID
					)
					)
    ) W LEFT OUTER JOIN REACTION R2 USING (WALLPOST_ID)
				GROUP BY WALLPOST_ID, W.DATED, POST_BODY, POSTED_BY_ID
		
		)
        JOIN READER R ON R.READER_ID = POSTED_BY_ID 
        ORDER BY DATED DESC
    `;
    const binds = {
        RID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getWallpostByReaderID2(usr) {
    const sql = `
        SELECT WALLPOST_ID, TIMEDIFF(DATED) TIMEDIF, POST_BODY, LIKE_COUNT 
        FROM WALLPOST
        WHERE POSTED_BY_ID = :RID
        ORDER BY DATED DESC
    `;
    const binds = {
        RID : usr
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getWallpostByReaderID(usr) {
    const sql = `
    SELECT W.WALLPOST_ID, TIMEDIFF(W.DATED) TIMEDIF, W.POST_BODY, COUNT(R.READER_ID) LIKE_COUNT 
        FROM WALLPOST W LEFT JOIN REACTION R ON (W.WALLPOST_ID = R.WALLPOST_ID)
        WHERE W.POSTED_BY_ID = :RID
				GROUP BY W.WALLPOST_ID, W.DATED, W.POST_BODY
        ORDER BY W.DATED DESC
    `;
    const binds = {
        RID : usr
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
    deleteWallpostByID,
    getWallpostByReaderID
};