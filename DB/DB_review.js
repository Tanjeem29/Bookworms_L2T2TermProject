const db = require('./DB_basics');

async function insertReview(review) {
    const sql = `
        INSERT INTO REVIEW 
        (TEXT_BODY, DATED, RATING, READER_ID, BOOK_ID)
        VALUES 
        (:BODY, SYSDATE, :RATING, :RID, :BID)
    `;
    const binds = {
        BODY : review.reviewBody,
        RATING : review.rating,
        RID : review.usr,
        BID : review.book
    }

    return await db.execute(sql, binds, db.options);
}

async function geyReviewByBookID(bid) {
    const sql = `
        SELECT R.USERNAME, TEXT_BODY, TIMEDIFF(DATED) TIMEDIF, REVIEW_ID, RATING
        FROM REVIEW NATURAL JOIN READER R
        WHERE BOOK_ID = :BID
        ORDER BY DATED DESC
    `;
    const binds = {
        BID : bid
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getUserSpecificReview(bid, usr) {
    const sql = `
        SELECT * 
        FROM REVIEW
        WHERE BOOK_ID = :BID AND READER_ID = :RID
    `;
    const binds = {
        BID : bid,
        RID : usr
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getReviewSummary(bid) {
    const sql_count = `
        SELECT COUNT(*) REV_COUNT
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID
    `;
    const sql_avg = `
        SELECT AVG(RATING) AVG_RATING
	    FROM REVIEW
	    WHERE BOOK_ID = :BID
    `;
    const sql_one = `
        SELECT COUNT(*) ONE_RATE 
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID AND RATING = 1
    `;
    const sql_two = `
        SELECT COUNT(*) TWO_RATE 
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID AND RATING = 2
    `;
    const sql_three = `
        SELECT COUNT(*) THREE_RATE 
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID AND RATING = 3
    `;
    const sql_four = `
        SELECT COUNT(*) FOUR_RATE 
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID AND RATING = 4
    `;
    const sql_five = `
        SELECT COUNT(*) FIVE_RATE 
	    FROM REVIEW 
	    WHERE BOOK_ID = :BID AND RATING = 5
    `;
    const binds = {
        BID : bid,
    }

    const rev_count = (await db.execute(sql_count, binds, db.options)).rows;
    const avg_rating = (await db.execute(sql_avg, binds, db.options)).rows;
    const one_rate = (await db.execute(sql_one, binds, db.options)).rows;
    const two_rate = (await db.execute(sql_two, binds, db.options)).rows;
    const three_rate = (await db.execute(sql_three, binds, db.options)).rows;
    const four_rate = (await db.execute(sql_four, binds, db.options)).rows;
    const five_rate = (await db.execute(sql_five, binds, db.options)).rows;

    const summary = {
        reviewCount : rev_count[0].REV_COUNT,
        avgRating : avg_rating[0].AVG_RATING,
        oneRate : one_rate[0].ONE_RATE,
        twoRate : two_rate[0].TWO_RATE,
        threeRate : three_rate[0].THREE_RATE,
        fourRate : four_rate[0].FOUR_RATE,
        fiveRate : five_rate[0].FIVE_RATE,
    }

    return summary;
}

module.exports = {
    insertReview,
    geyReviewByBookID,
    getUserSpecificReview,
    getReviewSummary
}