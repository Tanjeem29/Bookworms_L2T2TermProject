const db = require('./DB_Basics');


async function getGenres(){
    const sql = `
    SELECT * FROM GENRE
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
    getBooksByGenreID
    
}