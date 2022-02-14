
const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});

// const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
// DB.startup();
const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
const DB_inserts = require(process.env.ROOT + '\\DB\\DB_inserts');
const DB_Deletes = require(process.env.ROOT + '\\DB\\DB_Deletes');
const DB_RelSearches = require(process.env.ROOT + '\\DB\\DB_RelSearches');

router.get('/readers', (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        res.render('layout.ejs', {
            title : 'Readers',
            body : ['ReaderTest','partials/navbar/navbar'],
            user : null,
            //books
            //errors : errors
        })
    }
});

router.post('/readers/search', async (req, res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        console.log(req.body.search);
        //console.log(res.query);
        
        let results = await DB_Searches.searchByReadername(req.body.search);
        console.log(results);
        res.render('layout.ejs', {
            title : 'Readers',
            body : ['ReaderSearchTest','partials/navbar/navbar', req.body.search],
            user : null,
            SearchResults: results,
            //books
            //errors : errors
        })
    }


});

router.get('/readers/:id', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        const id = req.params.id;
        //console.log(id);
        let results;
        //results = DB_getByID;
        reader = await DB_getByID.getByReaderID(id);
        FollowStatus = await DB_RelSearches.getFollowReader(session.userid, id);
        console.log(FollowStatus);
        let FS = FollowStatus.length;


        let booksread = await DB_RelSearches.getBooksByReaderIDStatus(id, 1);
        let booksreading = await DB_RelSearches.getBooksByReaderIDStatus(id, 2);
        let bookswillread = await DB_RelSearches.getBooksByReaderIDStatus(id, 3);



        //books = await DB_RelSearches.getBooksByAuthorID(id);

        console.log(booksread);
        console.log(booksreading);
        console.log(bookswillread);



        res.render('layout.ejs', {
            title : 'Reader',
            body : ['OneReaderPage','partials/navbar/navbar'],
            //user : null,
            reader: reader[0],
            FollowStatus : FS,
            booksread : booksread,
            booksreading : booksreading,
            bookswillread : bookswillread
            //books : books
            //books
            //errors : errors
        })

    }
    
});


router.post('/readers/:id', async (req, res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        //console.log(str);
        const id = req.params.id;
        let str = '/readers/' + id;
       // console.log(str);
       let FS = req.body.follow;
       let r;




       
       FollowStatusResult = await DB_RelSearches.getFollowReader(session.userid, id);
       FollowStatus = FollowStatusResult.length;
       console.log(FS);
       console.log(FollowStatus);
       if(FS != FollowStatus){
            if(FS == 0){
                r = await DB_Deletes.resetFollowReader(session.userid, id);
            }
            else{
                console.log('Inserting FOllowReader');
                r = await DB_inserts.insertFollowReader(session.userid, id);
            }
       }
       
       res.redirect(str);
    }


});


module.exports = router;