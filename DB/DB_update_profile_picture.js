const db = require('./DB_Basics');

async function getPhotoByID(uid) {
    const sql = `
    SELECT PHOTO
    FROM READER
    WHERE READER_ID = :RID
    `;
    const binds = {
        RID : uid
    }
    return (await db.execute(sql,binds, db.options)).rows;
}

async function updatePhotoByID(path, uid) {
    const sql = `
    UPDATE READER 
    SET PHOTO = :PATH
    WHERE READER_ID = :RID
    `;
    const binds = {
        PATH : path,
        RID : uid
    }
    return await db.execute(sql, binds, db.options);
}

module.exports = {
    getPhotoByID,
    updatePhotoByID
}