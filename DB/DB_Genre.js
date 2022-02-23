const db = require('./DB_Basics');


async function getGenres(){
    const sql = `
    SELECT * FROM GENRE
    ORDER BY GENRE_ID
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getBooksByGenreID(GenID){
    const sql = `
    SELECT * FROM 
    (SELECT * FROM GENRE WHERE GENRE_ID = :GenID)
    NATURAL JOIN BOOK_GENRE NATURAL JOIN BOOKS 
    ORDER BY ISMDB_RATINGS DESC
    `;
    const binds = {
        GenID : GenID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getGenreByReaderID(RID){
    const sql = `
    SELECT READER_ID, GENRE_ID, GENRE_NAME FROM 
    (SELECT READER_ID FROM READER WHERE READER_ID = :RID) NATURAL JOIN READER_GENRE NATURAL JOIN GENRE
    `;
    const binds = {
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getGenreByAuthorID(AID){
    const sql = `
    SELECT AUTHOR_ID, GENRE_ID, GENRE_NAME FROM 
    (SELECT AUTHOR_ID FROM AUTHOR WHERE AUTHOR_ID = :AID) NATURAL JOIN AUTHOR_GENRE NATURAL JOIN GENRE
    `;
    const binds = {
        AID : AID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getGenreByBookID(BID){
    const sql = `
    SELECT BOOK_ID, GENRE_ID, GENRE_NAME FROM 
    (SELECT BOOK_ID FROM BOOKS WHERE BOOK_ID = :BID) NATURAL JOIN BOOK_GENRE NATURAL JOIN GENRE
    `;
    const binds = {
        BID : BID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



async function getAuthorsByGenreID(GenID){
    const sql = `
    SELECT * FROM 
    (SELECT * FROM GENRE WHERE GENRE_ID = :GenID)
    NATURAL JOIN BOOK_GENRE NATURAL JOIN BOOKS 
    ORDER BY ISMDB_RATINGS DESC
    `;
    const binds = {
        GenID : GenID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}




module.exports = {
    getGenres,
    getBooksByGenreID,
    getGenreByReaderID,
    getGenreByAuthorID,
    getGenreByBookID
    
}