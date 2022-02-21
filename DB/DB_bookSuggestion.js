const db = require('./DB_Basics');

//Suggested books: The books that is highest read by my followers but not in my bookshelf.
async function bookSuggestionByFollowedReader(rid) {
    const sql = `
        SELECT B.BOOK_ID, B.TITLE
        FROM (SELECT R.BOOK_ID , COUNT(R.READER_ID) READ_COUNT
        FROM FOLLOWER_READER F JOIN READ_STATUS R
        ON F.READER_ID = R.READER_ID
        WHERE F.FOLLOWER_ID = :RID
        GROUP BY R.BOOK_ID
        HAVING R.BOOK_ID NOT IN (SELECT RE.BOOK_ID
                                FROM READ_STATUS RE
                                WHERE RE.READER_ID = :RID) 
        ) T
        JOIN BOOKS B ON B.BOOK_ID = T.BOOK_ID 
        ORDER BY READ_COUNT DESC
        FETCH NEXT 4 ROWS ONLY
    `;
    const binds = {
        RID : rid
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

module.exports = {
    bookSuggestionByFollowedReader
}