

const db = require('./DB_Basics');


async function getBooks(){
    const sql = `
    SELECT BOOK_ID, TITLE FROM BOOKS
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getAuthors(){
    const sql = `
    SELECT AUTHOR_ID, FIRST_NAME || ' ' || LAST_NAME Name FROM AUTHOR
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function getReaders(){
    const sql = `
    SELECT READER_ID, FIRST_NAME || ' ' || LAST_NAME Name, USERNAME Username FROM READER
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function getQuotes(){
    const sql = `
    SELECT QUOTES_ID, TEXT_BODY FROM QUOTES
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function getPublishers(){
    const sql = `
    SELECT PUBLISHER_ID, NAME FROM PUBLISHER
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function getGenres(){
    const sql = `
    SELECT GENRE_ID, GENRE_NAME FROM GENRE
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function insertAuthor(fname, lname, email, bio, born, photo){
    const sql = `
    INSERT INTO AUTHOR 
	(FIRST_NAME, LAST_NAME, EMAIL, BIO, BORN, PHOTO) 
	VALUES 
	(:fname, :lname, :email, :bio, TO_DATE(:dob, 'DD/MM/YYYY'), :photo)
    `;
    const binds = {
        fname : fname,
        lname : lname,
        email : email,
        dob : born,
        bio : bio,
        photo : photo
    }

    return (await db.execute(sql, binds, {}));
}

async function deleteAuthor(AID){
    const sql = `
    DELETE FROM AUTHOR 
    WHERE AUTHOR_ID = :AID
    `;
    const binds = {
        AID : AID
    }

    return (await db.execute(sql, binds, db.options));
}

async function deleteReader(RID){
    const sql = `
    DELETE FROM READER
    WHERE READER_ID = :RID
    `;
    const binds = {
        RID : RID
    }

    return (await db.execute(sql, binds, db.options));
}

async function insertBook(title, preview, ISMDB, publisher, edition, cover){
    const sql = `
    INSERT INTO BOOKS 
	(TITLE, PREVIEW, ISMDB_RATINGS, PUBLISHER_ID, LATEST_EDITION, COVER) 
	VALUES 
	(:title, :preview, :ISMDB, :publisher, :edition, :cover)
    `;
    const binds = {
        title : title,
        preview : preview,
        ISMDB : ISMDB,
        publisher : publisher,
        edition : edition,
        cover : cover
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteBook(BID){
    const sql = `
    DELETE FROM BOOKS 
    WHERE BOOK_ID = :BID
    `;
    const binds = {
        BID : BID
    }

    return (await db.execute(sql, binds, db.options));
}

async function insertGenre(name, summary, photo){
    const sql = `
    INSERT INTO GENRE 
	(GENRE_NAME, SUMMARY, PHOTO) 
	VALUES 
	(:name, :summary, :photo)
    `;
    const binds = {
        name : name,
        summary : summary,
        photo : photo
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteGenre(GenID){
    const sql = `
    DELETE FROM GENRE 
    WHERE GENRE_ID = :GenID
    `;
    const binds = {
        GenID : GenID
    }

    return (await db.execute(sql, binds, db.options));
}

async function insertPublisher(name, address, contact, email){
    const sql = `
    INSERT INTO PUBLISHER 
	(NAME, ADDRESS, CONTACT, EMAIL) 
	VALUES 
	(:name, :address, :contact, :email)
    `;
    const binds = {
        name : name,
        address : address,
        contact : contact,
        email : email
    }
    return (await db.execute(sql, binds, {}));
}

async function deletePublisher(PubID){
    const sql = `
    DELETE FROM PUBLISHER 
    WHERE PUBLISHER_ID = :PubID
    `;
    const binds = {
        PubID : PubID
    }

    return (await db.execute(sql, binds, db.options));
}

async function insertQuote(body, book, character){
    const sql = `
    INSERT INTO QUOTES 
	(TEXT_BODY, BOOK_ID, CHARACTER) 
	VALUES 
	(:body, :book, :character)
    `;
    const binds = {
        body : body,
        book : book,
        character : character
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteQuote(QuoID){
    const sql = `
    DELETE FROM QUOTES 
    WHERE QUOTES_ID = :QuoID
    `;
    const binds = {
        QuoID : QuoID
    }

    return (await db.execute(sql, binds, db.options));
}

async function getWrittenBy(){
    const sql = `
    SELECT BOOK_ID, TITLE, AUTHOR_ID, FIRST_NAME || ' ' || LAST_NAME AUTHOR_NAME
    FROM
    BOOKS NATURAL JOIN WRITTEN_BY NATURAL JOIN AUTHOR
    ORDER BY AUTHOR_NAME
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}
async function insertWrittenBy(AID, BID){
    const sql = `
    INSERT INTO WRITTEN_BY 
	(AUTHOR_ID, BOOK_ID) 
	VALUES 
	(:AID, :BID)
    `;
    const binds = {
        AID : AID,
        BID : BID
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteWrittenBy(AID, BID){
    const sql = `
    DELETE FROM WRITTEN_BY 
    WHERE AUTHOR_ID = :AID AND BOOK_ID = :BID
    `;
    const binds = {
        AID : AID,
        BID : BID
    }

    return (await db.execute(sql, binds, db.options));
}


async function getBookGenre(){
    const sql = `
    SELECT BOOK_ID, TITLE, GENRE_ID, GENRE_NAME
    FROM
    BOOKS NATURAL JOIN BOOK_GENRE NATURAL JOIN GENRE
    ORDER BY TITLE
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}
async function insertBookGenre(GID, BID){
    const sql = `
    INSERT INTO BOOK_GENRE 
	(GENRE_ID, BOOK_ID) 
	VALUES 
	(:GID, :BID)
    `;
    const binds = {
        GID : GID,
        BID : BID
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteBookGenre(GID, BID){
    const sql = `
    DELETE FROM BOOK_GENRE 
    WHERE GENRE_ID = :GID AND BOOK_ID = :BID
    `;
    const binds = {
        GID : GID,
        BID : BID
    }

    return (await db.execute(sql, binds, db.options));
}

async function getAuthorGenre(){
    const sql = `
    SELECT AUTHOR_ID, A.FIRST_NAME || ' ' || A.LAST_NAME AUTHOR_NAME, GENRE_ID, G.GENRE_NAME
    FROM
    (AUTHOR A JOIN AUTHOR_GENRE AG USING(AUTHOR_ID)) JOIN GENRE G USING (GENRE_ID)
    ORDER BY AUTHOR_NAME
    `;
    const binds = {
    }

    return (await db.execute(sql, binds, db.options)).rows;
}
async function insertAuthorGenre(GID, AID){
    const sql = `
    INSERT INTO AUTHOR_GENRE 
	(GENRE_ID, AUTHOR_ID) 
	VALUES 
	(:GID, :AID)
    `;
    const binds = {
        GID : GID,
        AID : AID
    }
    return (await db.execute(sql, binds, {}));
}

async function deleteAuthorGenre(GID, AID){
    const sql = `
    DELETE FROM AUTHOR_GENRE 
    WHERE GENRE_ID = :GID AND AUTHOR_ID = :AID
    `;
    const binds = {
        GID : GID,
        AID : AID
    }

    return (await db.execute(sql, binds, db.options));
}

module.exports = {
    getBooks,
    getAuthors,
    getReaders,
    getGenres,
    getPublishers,
    getQuotes,
    insertAuthor,
    deleteAuthor,
    deleteReader,
    insertBook,
    deleteBook,
    insertGenre,
    deleteGenre,
    insertPublisher,
    deletePublisher,
    insertQuote,
    deleteQuote,
    getWrittenBy,
    insertWrittenBy,
    deleteWrittenBy,
    getBookGenre,
    insertBookGenre,
    deleteBookGenre,
    getAuthorGenre,
    insertAuthorGenre,
    deleteAuthorGenre



}