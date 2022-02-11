const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
const session = require('express-session');
require('dotenv').config();
const router = express.Router({mergeParams : true});

// const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
//     DB.startup();
    const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
    const DB_RelSearches = require(process.env.ROOT + '\\DB\\DB_RelSearches');
    const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');


router.get('/books', (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        res.render('layout.ejs', {
            title : 'Books',
            body : ['BookTest','partials/navbar/navbar'],
            user : null,
            books
            //errors : errors
        })
    }
    
});
router.get('/books/search', (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        res.redirect('/books');
    }
    
});


router.get('/books/:id', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        const id = req.params.id;
        //console.log(id);
        let books;
        //results = DB_getByID;
        books = await DB_getByID.getByBookID(id);
        publisher = await DB_getByID.getByPublisherID(books[0].PUBLISHER_ID);
        authors = await DB_RelSearches.getAuthorByBookID(id);
        reader = await DB_getByID.
        console.log(authors[0]);
        console.log(publisher[0]);
        res.render('layout.ejs', {
            title : 'Books',
            body : ['OneBookPage','partials/navbar/navbar'],
            user : null,
            book: books[0],
            author: authors,
            publisher: publisher,
            rid : session.userid

            //books
            //errors : errors
        })

    }
    
});


// router.get('/books/search', (req,res)=>{
//     //res.send('<H3>Login</H3>');
//     //res.sendFile('./views/404.html', {root: __dirname});
//     console.log(res.query);
//     res.render('layout.ejs', {
//         title : 'Books',
//         body : ['BookSearchTest','partials/navbar/navbar'],
//         user : null,
//         books
//         //errors : errors
//     })
// });

// router.post('/books', async (req, res) => {
//     console.log(req.query);
//     console.log(res.query);
//     res.render('layout.ejs', {
//         title : 'Books',
//         body : ['BookSearchTest','partials/navbar/navbar'],
//         user : null,
//         books
//         //errors : errors
//     })

// });


router.post('/books/search', async (req, res) => {
    session = req.session;
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        console.log(req.body.search);
        //console.log(res.query);
        //Check parameter for type of search
        let results;
        let fl = req.body.fl;
        if(fl == 1){
            results = await DB_Searches.searchByBookname(req.body.search);
        }
        else if(fl == 2){
            results = await DB_Searches.searchBookByPublisherName(req.body.search);
        }
        else if(fl == 3){
            results = await DB_Searches.searchBookByAuthorName(req.body.search);
        }
        
        console.log(results);
        res.render('layout.ejs', {
            title : 'Books',
            body : ['BookSearchTest','partials/navbar/navbar', req.body.search],
            user : null,
            SearchResults: results,
            fl   : req.body.fl
            //errors : errors
        })
        //DB.shutdown();
    }

});

module.exports = router;