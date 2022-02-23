const db = require('./DB_Basics');


async function getByBookID(strin){
    const sql = `
    SELECT * FROM BOOKS B
    WHERE B.BOOK_ID = :BookID
    `;
    const binds = {
        BookID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getByReaderID(strin){
    const sql = `
    SELECT TO_CHAR(born, 'MON DD, YYYY') BORN, READER_ID, FIRST_NAME, LAST_NAME, BIO, EMAIL, USERNAME, PHOTO 
    FROM READER R
    WHERE R.READER_ID = :RID
    `;
    const binds = {
        RID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


//console.log(getByBookID(1));

async function getByAuthorID(strin){
    const sql = `
    select * from AUTHOR
    where AUTHOR.AUTHOR_ID = :AID
    `;
    const binds = {
        AID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getByPublisherID(strin){
    const sql = `
    select * from PUBLISHER
    where PUBLISHER_ID = :PID
    `;
    const binds = {
        PID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getByGenreID(strin){
    const sql = `
    select * from GENRE
    where GENRE_ID = :GID
    `;
    const binds = {
        GID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

module.exports =
{ 
    getByBookID,
    getByAuthorID,
    getByReaderID,
    getByPublisherID,
    getByGenreID
}