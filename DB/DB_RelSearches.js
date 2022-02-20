const db = require('./DB_Basics');


async function getBooksByPublisherID(PubID){
    const sql = `
    SELECT * 
    FROM BOOKS B
    WHERE B.PUBLISHER_ID = :PubID
    `;
    const binds = {
        PubID : PubID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getBooksByGenreID(GenID){
    const sql = `
    SELECT * from (BOOKS NATURAL JOIN (
        SELECT * FROM BOOK_GENRE 
        WHERE GENRE_ID = :GID
        ) ) ORDER BY ISMDB_RATINGS
    `;
    const binds = {
        GID : GenID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getAuthorsByGenreID(GenID){
    const sql = `
    SELECT * from (AUTHOR NATURAL JOIN (
        SELECT * FROM AUTHOR_GENRE 
        WHERE GENRE_ID = :GID
        ) ) ORDER BY FIRST_NAME
    `;
    const binds = {
        GID : GenID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}





async function getAuthorByBookID(strin){
    const sql = `
    SELECT * 
    FROM AUTHOR A NATURAL JOIN WRITTEN_BY W
    WHERE W.BOOK_ID = :BookID
    `;
    const binds = {
        BookID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function getBooksByAuthorID(strin){
    const sql = `
    Select * from 
    (Select * from WRITTEN_BY 
    WHERE AUTHOR_ID = :AID
    ) NATURAL JOIN BOOKS NATURAL JOIN PUBLISHER
    ORDER BY TITLE
    `;
    const binds = {
        AID : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getBooksByReaderIDStatus(RID, S){
    const sql = `
    Select * from 
    BOOKS NATURAL JOIN 	
	(SELECT BOOK_ID, STATUS, DATED from READ_STATUS 
	WHERE READER_ID = :RID AND STATUS = :S)
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : RID,
        S : S
    }

    return (await db.execute(sql, binds, db.options)).rows;
}




async function getReadStatusForBook(RID, BID){
    const sql = `
    SELECT * 
    FROM READ_STATUS RS
    WHERE RS.BOOK_ID = :BID AND RS.READER_ID = :RID
    `;
    const binds = {
        BID : BID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getFollowAuthor(RID, AID){
    const sql = `
    SELECT * 
    FROM FOLLOWER_AUTHOR FA
    WHERE FA.AUTHOR_ID = :AID AND FA.FOLLOWER_ID = :RID
    `;
    const binds = {
        AID : AID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



async function getFollowReader(FID, RID){
    const sql = `
    SELECT * 
    FROM FOLLOWER_READER FR
    WHERE FR.READER_ID = :RID AND FR.FOLLOWER_ID = :FID
    `;
    const binds = {
        FID : FID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function commonAuthorsFollowed(MeID, RID){
    const sql = `
    Select * from 
    AUTHOR NATURAL JOIN (
    (SELECT AUTHOR_ID from FOLLOWER_AUTHOR 
    Where FOLLOWER_ID = :MeID)
    INTERSECT
    (Select AUTHOR_ID from FOLLOWER_AUTHOR
    where FOLLOWER_ID = :RID))
    `;
    const binds = {
        MeID : MeID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function otherAuthorsFollowed(MeID, RID){
    const sql = `
    Select * from 
    AUTHOR NATURAL JOIN (
    (SELECT AUTHOR_ID from FOLLOWER_AUTHOR 
    Where FOLLOWER_ID = :MeID)
    MINUS
    (Select AUTHOR_ID from FOLLOWER_AUTHOR
    where FOLLOWER_ID = :RID))
    `;
    const binds = {
        MeID : MeID,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function getAllBooksByReaderID(RID){
    const sql = `
    SELECT * from BOOKS B, (
		SELECT BOOK_ID, RS.STATUS, ROUND(SYSDATE - RS.DATED, 1) TD from READ_STATUS RS
		WHERE READER_ID = :RID) T1
	WHERE (B.BOOK_ID = T1.BOOK_ID)
    ORDER BY TD
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getAuthorsFollowedByReaderID2(RID){
    const sql = `
    SELECT * from AUTHOR A, (
		SELECT AUTHOR_ID, ROUND(SYSDATE - FA.DATED, 1) TD from FOLLOWER_AUTHOR FA
		WHERE FOLLOWER_ID = :RID) T1
	WHERE (A.AUTHOR_ID = T1.AUTHOR_ID)
    ORDER BY TD
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getAuthorsFollowedByReaderID(RID){
    const sql = `
    SELECT * from AUTHOR A, (
		SELECT AUTHOR_ID, TIMEDIFF(FA.DATED) TD, DATED from FOLLOWER_AUTHOR FA
		WHERE FOLLOWER_ID = :RID) T1
	WHERE (A.AUTHOR_ID = T1.AUTHOR_ID)
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getReadersFollowedByReaderID(RID){
    const sql = `
    SELECT * from READER R, (
		SELECT READER_ID, TIMEDIFF(FR.DATED) TD, DATED from FOLLOWER_READER FR
		WHERE FOLLOWER_ID = :RID) T1
	WHERE (R.READER_ID = T1.READER_ID)
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getFollowersByReaderID(RID){
    const sql = `
    SELECT * from READER R, (
		SELECT FOLLOWER_ID, TIMEDIFF(FR.DATED) TD, DATED from FOLLOWER_READER FR
		WHERE READER_ID = :RID) T1
	WHERE (R.READER_ID = T1.FOLLOWER_ID)
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



async function authorPageQuery1(RID){ //gets authors of most books in my bookshelf, that I've not followed
    const sql = `
    SELECT AUTHOR_ID, FIRST_NAME, LAST_NAME, C FROM AUTHOR NATURAL JOIN (
        (SELECT AUTHOR_ID, COUNT(BOOK_ID) AS C
						FROM 
						WRITTEN_BY 
						NATURAL JOIN
						(SELECT BOOK_ID FROM READ_STATUS
						WHERE READER_ID = :RID) 
				GROUP BY AUTHOR_ID 
				HAVING AUTHOR_ID NOT IN 
									(Select AUTHOR_ID from FOLLOWER_AUTHOR
									WHERE FOLLOWER_ID = :RID)
				ORDER BY COUNT(BOOK_ID) DESC 
				FETCH NEXT 5 ROWS ONLY) 
		)
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function authorPageQuery2(RID, AID){ //gets books in my bookshelf, of an author that I've not followed
    const sql = `
    SELECT * FROM BOOKS
    NATURAL JOIN (
    SELECT BOOK_ID FROM WRITTEN_BY
    WHERE AUTHOR_ID = :AID
    INTERSECT
    SELECT BOOK_ID FROM READ_STATUS
    WHERE READER_ID = :RID
)ORDER BY ISMDB_RATINGS DESC
    `;
    const binds = {
        RID : RID,
        AID : AID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function readerPageQuery1(RID){ //gets readers who like similar books, that I've not followed
    const sql = `
    SELECT READER_ID, FIRST_NAME, LAST_NAME, USERNAME, C FROM READER NATURAL JOIN (
        (SELECT READER_ID, COUNT(BOOK_ID) AS C
						FROM 
						READ_STATUS 
						NATURAL JOIN
						(SELECT BOOK_ID FROM READ_STATUS
						WHERE READER_ID = :RID) 
				WHERE READER_ID <> :RID 
				GROUP BY READER_ID 
				HAVING READER_ID NOT IN 
									(Select READER_ID from FOLLOWER_READER
									WHERE FOLLOWER_ID = :RID)
				ORDER BY COUNT(BOOK_ID) DESC 
				FETCH NEXT 5 ROWS ONLY) 
		)
    `;
    const binds = {
        RID : RID,
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function readerPageQuery2(FID, RID){ //gets books in my bookshelf, liked by an unfollowed reader
    const sql = `
    SELECT * FROM BOOKS
    NATURAL JOIN (
    SELECT BOOK_ID FROM READ_STATUS
    WHERE READER_ID = :RID
    INTERSECT
    SELECT BOOK_ID FROM READ_STATUS
    WHERE READER_ID = :FID
    ) ORDER BY ISMDB_RATINGS DESC
    `;
    const binds = {
        RID : RID,
        FID : FID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

//Move to review later
async function getBooknReviewByReaderID(usr) {
    const sql = `
    SELECT * 
    FROM (SELECT * FROM REVIEW
    WHERE READER_ID = :RID)
    NATURAL JOIN BOOKS
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : usr
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getWallpostByReaderID(usr) {
    const sql = `
    SELECT * 
    FROM WALLPOST
    WHERE POSTED_BY_ID = :RID
    ORDER BY DATED DESC
    `;
    const binds = {
        RID : usr
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



module.exports ={
    getBooksByPublisherID,
    getBooksByGenreID,
    getAuthorByBookID,
    getAuthorsByGenreID,
    getReadStatusForBook,
    getFollowAuthor,
    getBooksByAuthorID,
    getFollowReader,
    getBooksByReaderIDStatus,
    commonAuthorsFollowed,
    otherAuthorsFollowed,
    getAllBooksByReaderID,
    getAuthorsFollowedByReaderID,
    getReadersFollowedByReaderID,
    getFollowersByReaderID,
    authorPageQuery1,
    authorPageQuery2,
    readerPageQuery1,
    readerPageQuery2,
    //Move to review
    getBooknReviewByReaderID,
    getWallpostByReaderID,
    //Move to wallpost
    

}