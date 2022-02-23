
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
const DB_quotes = require(process.env.ROOT + '\\DB\\DB_Quotes');

const DB_Genre = require(process.env.ROOT + '\\DB\\DB_Genre');

router.get('/authors', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let quotes = await DB_quotes.getRandomQuote();


        let id = req.session.userid;
        let authors = await DB_RelSearches.authorPageQuery1(id);
        //console.log(authors); 
        let ALen = Math.min(authors.length, 5);
        let books = [];
        for(var i = 0; i< ALen; i++){
            let temp = await DB_RelSearches.authorPageQuery2(id, authors[i].AUTHOR_ID);
            books.push(temp);
            //console.log(books[i].length);
        }
        //console.log(books);
        

        res.render('layout.ejs', {
            title : 'Authors',
            body : ['AuthorTest','partials/navbar/navbar'],
            user : null,
            authors : authors,
            AfLen : ALen,
            books : books,
            Quotes : quotes[0],
            
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
        let quotes = await DB_quotes.getRandomQuote();


        console.log(req.body.search);
        //console.log(res.query);
        let id = req.session.userid;
        let results;
        let fl = req.body.fl;
    
        let type;
        console.log(fl)
        if(typeof fl == 'undefined'){
            res.redirect('/authors');
        }
        else
        {
            
        if(fl == 1){
            results = await DB_Searches.searchByAuthorname(req.body.search);
            type = 'All';
        }
        else if(fl == 2){
            results = await DB_Searches.searchByAuthorname_Followed(id,req.body.search);
            type = 'Followed';
        }
        else if(fl == 3){
            results = await DB_Searches.searchByAuthorname_NotFollowed(id,req.body.search);
            type = 'Not Followed';
        }
        
        //let results = await DB_Searches.searchByAuthorname(req.body.search);
        console.log(results);
        res.render('layout.ejs', {
            title : 'Authors',
            body : ['AuthorSearchTest','partials/navbar/navbar', req.body.search],
            user : null,
            SearchResults: results,
            type : type,
            Quotes : quotes[0]
            //books
            //errors : errors
        })

        }
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
        let quotes = await DB_quotes.getRandomQuote();


        const id = req.params.id;
        //console.log(id);
        let results;
        //results = DB_getByID;
        author = await DB_getByID.getByAuthorID(id);
        FollowStatus = await DB_RelSearches.getFollowAuthor(session.userid, id);
        console.log(FollowStatus);
        let FS = FollowStatus.length;



        books = await DB_RelSearches.getBooksByAuthorID(id);

        //console.log(books);
        if(author[0].PHOTO == null) {
            console.log("Dummy Photo rendering");
            path = "/author/dummy.png";
        }
        else {
            path = "/author/" + author[0].PHOTO;
        }



        genre = await DB_Genre.getGenreByReaderID(id);
        res.render('layout.ejs', {
            title : 'Author',
            body : ['OneAuthorPage','partials/navbar/navbar'],
            //user : null,
            author: author[0],
            FollowStatus : FS,
            books : books,
            Quotes : quotes[0],
            photo : path,
            genre : genre,
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