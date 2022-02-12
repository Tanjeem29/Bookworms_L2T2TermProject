
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

router.get('/authors', (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        res.render('layout.ejs', {
            title : 'Authors',
            body : ['AuthorTest','partials/navbar/navbar'],
            user : null,
            //books
            //errors : errors
        })
    }
});

router.get('/authors/:id', async (req,res)=>{
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
        author = await DB_getByID.getByAuthorID(id);
        FollowStatus = await DB_RelSearches.getFollowAuthor(session.userid, id);
        console.log(FollowStatus);
        let FS = FollowStatus.length;


        res.render('layout.ejs', {
            title : 'Author',
            body : ['OneAuthorPage','partials/navbar/navbar'],
            //user : null,
            author: author[0],
            FollowStatus : FS
            
            //books
            //errors : errors
        })

    }
    
});



router.post('/authors/search', async (req, res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        console.log(req.body.search);
        //console.log(res.query);
        
        let results = await DB_Searches.searchByAuthorname(req.body.search);
        console.log(results);
        res.render('layout.ejs', {
            title : 'Authors',
            body : ['AuthorSearchTest','partials/navbar/navbar', req.body.search],
            user : null,
            SearchResults: results,
            //books
            //errors : errors
        })
    }


});


router.post('/authors/:id', async (req, res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        //console.log(str);
        const id = req.params.id;
        let str = '/authors/' + id;
       // console.log(str);
       let FS = req.body.follow;
       let r;
       
       FollowStatusResult = await DB_RelSearches.getFollowAuthor(session.userid, id);
       FollowStatus = FollowStatusResult.length;
       console.log(FS);
       console.log(FollowStatus);
       if(FS != FollowStatus){
            if(FS == 0){
                r = await DB_Deletes.resetFollowAuthor(session.userid, id);
            }
            else{
                console.log('Inserting FOllowAuthor');
                r = await DB_inserts.insertFollowAuthor(session.userid, id);
            }
       }
       
       res.redirect(str);
    }


});

module.exports = router;