const { result } = require('lodash');
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
        FETCH NEXT 3 ROWS ONLY
    `;
    const binds = {
        RID : rid
    }

    const sql1 = `
        SELECT A.FIRST_NAME || ' ' || A.LAST_NAME NAME, W.BOOK_ID
        FROM AUTHOR A NATURAL JOIN WRITTEN_BY W
        WHERE BOOK_ID = :BID
    `;

    results = (await db.execute(sql, binds, db.options)).rows;
    for(var i = 0; i < results.length; i++) {
        const binds1 = {
            BID : results[i].BOOK_ID
        } 
        authorName = (await db.execute(sql1, binds1, db.options)).rows;
        results[i].AUTHOR_NAME = authorName[0].NAME
    }
    return results;
}

module.exports = {
    bookSuggestionByFollowedReader
}