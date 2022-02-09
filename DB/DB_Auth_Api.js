const db = require('./DB_Basics');

async function getRIDByEmail(email){
    const sql = `
        SELECT 
            *
        FROM 
            READER
        WHERE 
            EMAIL = :email
        `;
    const binds = {
        email : email
    }

    return (await db.execute(sql, binds, db.options)).rows;
}

async function createNewReader(user){
    const sql = `
    INSERT INTO READER 
	(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD, BORN) 
	VALUES 
	(:fname, :lname, :email, :username, :password, TO_DATE(:dob, 'DD/MM/YYYY'))
    `;
    const binds = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        username: user.username,
        password: user.password,
        dob: user.born,
    }

    console.log(`
    INSERT INTO READER 
	(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD, BORN) 
	VALUES 
	(:fname, :lname, :email, :username, :password, TO_DATE(:dob, 'DD/MM/YYYY'))
    `)

    return (await db.execute(sql, binds, {}));
}

module.exports = {
    getRIDByEmail,
    createNewReader
}