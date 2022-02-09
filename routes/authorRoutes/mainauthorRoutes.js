
const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});

const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
    DB.startup();
    const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');


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

module.exports = router;