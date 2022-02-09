const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});

const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
    DB.startup();
    const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');


router.get('/books', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('layout.ejs', {
        title : 'Books',
        body : ['BookTest','partials/navbar/navbar'],
        user : null,
        books
        //errors : errors
    })
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
    console.log(req.body.search);
    //console.log(res.query);
    
    let results = await DB_Searches.searchByBookname(req.body.search);
    console.log(results);
    res.render('layout.ejs', {
        title : 'Books',
        body : ['BookSearchTest','partials/navbar/navbar', req.body.search],
        user : null,
        SearchResults: results,
        books
        //errors : errors
    })
    //DB.shutdown();

});

module.exports = router;