const db = require('./DB_Basics');

async function searchByBookname(strin){
    const sql = `
    Select * from BOOKS b
    where Upper(b.TITLE) like '%' || Upper(:bname) || '%'
    `;
    const binds = {
        bname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchByAuthorname(strin){
    const sql = `
    select * from AUTHOR
    where UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%'
    `;
    const binds = {
        aname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchByAuthorname_Followed(RID , strin){
    const sql = `
    select * from AUTHOR NATURAL JOIN (SELECT AUTHOR_ID FROM FOLLOWER_AUTHOR WHERE FOLLOWER_ID = :RID)
    where UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%' 
    `;
    const binds = {
        aname : strin,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function searchByAuthorname_NotFollowed(RID , strin){
    const sql = `
    select * from AUTHOR 
    where (
        UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%' 
        AND
        AUTHOR_ID NOT IN (SELECT AUTHOR_ID FROM FOLLOWER_AUTHOR WHERE FOLLOWER_ID = :RID)
        )
    `;
    const binds = {
        aname : strin,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function searchByReadername(strin){
    const sql = `
    select * from READER
    where UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%' 
    OR
    UPPER (USERNAME) like '%' || UPPER(:aname) || '%' 
    `;
    const binds = {
        aname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchByReadername_Followed(RID , strin){
    const sql = `
    select * from READER NATURAL JOIN (SELECT READER_ID FROM FOLLOWER_READER WHERE FOLLOWER_ID = :RID)
    where UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%' 
    OR
    UPPER (USERNAME) like '%' || UPPER(:aname) || '%' 
    `;
    const binds = {
        aname : strin,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchByReadername_NotFollowed(RID , strin){
    const sql = `
    select * from READER 
    where (
        UPPER(FIRST_NAME || ' ' || LAST_NAME) like '%' || UPPER(:aname) || '%' 
        OR
        UPPER (USERNAME) like '%' || UPPER(:aname) || '%')
        AND
        READER_ID NOT IN (SELECT READER_ID FROM FOLLOWER_READER WHERE FOLLOWER_ID = :RID)
    `;
    const binds = {
        aname : strin,
        RID : RID
    }

    return (await db.execute(sql, binds, db.options)).rows;
}


async function searchBookByPublisherName(strin){
    const sql = `
    select b.TITLE, BOOK_ID, b.PREVIEW BOOK_PREVIEW, b.ISMDB_RATINGS, b.LATEST_EDITION, PUBLISHER_ID, p.NAME PUBLISHER_NAME
    from (BOOKS b natural join Publisher p) 
    WHERE UPPER(p.NAME) LIKE '%' || UPPER(:pname) ||'%'
    `;
    const binds = {
        pname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function searchBookByAuthorName(strin){
    const sql = `
    select b.TITLE, BOOK_ID, b.PREVIEW BOOK_PREVIEW, b.ISMDB_RATINGS, b.LATEST_EDITION, AUTHOR_ID, a.FIRST_NAME, a.LAST_NAME
    from (BOOKS b natural join WRITTEN_BY natural join AUTHOR a) 
    WHERE UPPER(FIRST_NAME || ' ' || LAST_NAME) LIKE '%' || UPPER(:pname) ||'%'
    `;
    const binds = {
        pname : strin
    }

    return (await db.execute(sql, binds, db.options)).rows;
}



module.exports = {
    searchByBookname,
    searchByAuthorname,
    searchBookByPublisherName,
    searchBookByAuthorName,
    searchByReadername,
    searchByReadername_Followed,
    searchByReadername_NotFollowed,
    searchByAuthorname_Followed,
    searchByAuthorname_NotFollowed
}