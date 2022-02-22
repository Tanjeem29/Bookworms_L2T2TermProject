const db = require('./DB_Basics');


async function getRandomQuote(){
    const sql = `
    SELECT Q.TEXT_BODY, Q.CHARACTER, Q.BOOK_ID, B.TITLE FROM QUOTES Q LEFT JOIN BOOKS B
    ON(Q.BOOK_ID = B.BOOK_ID)
    ORDER BY dbms_random.value
    FETCH FIRST 1 ROWS ONLY
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


module.exports = {
    getRandomQuote,
    
}