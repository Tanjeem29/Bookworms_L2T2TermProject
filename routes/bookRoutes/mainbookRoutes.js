const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
//const session = require('express-session');
require('dotenv').config();
const router = express.Router({mergeParams : true});

// const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
//     DB.startup();
    const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
    const DB_Updates = require(process.env.ROOT + '\\DB\\DB_Updates');
    const DB_RelSearches = require(process.env.ROOT + '\\DB\\DB_RelSearches');
    const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
    const DB_inserts = require(process.env.ROOT + '\\DB\\DB_inserts');
    const DB_Deletes = require(process.env.ROOT + '\\DB\\DB_Deletes');
    const DB_review = require(process.env.ROOT + '\\DB\\DB_review');


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
        let books;
        //results = DB_getByID;
        books = await DB_getByID.getByBookID(id);
        publisher = await DB_getByID.getByPublisherID(books[0].PUBLISHER_ID);
        authors = await DB_RelSearches.getAuthorByBookID(id);
        ReadStatus = await DB_RelSearches.getReadStatusForBook(session.userid, id);
        
        //review stuff
        let userReview = await DB_review.getUserSpecificReviewByBookID(id, session.userid);
        let otherReview = await DB_review.getOthersReviewByBookID(id, session.userid);
        let reviewSummary = await DB_review.getReviewSummary(id);
        //console.log(reviewSummary);
        //console.log(allReviews);

        // console.log(authors[0]);
        // console.log(publisher[0]);
        // console.log(id);
        // console.log(session.userid);
        // console.log(ReadStatus[0].STATUS);
        let newReadStatus;
        if(ReadStatus.length == 0) newReadStatus = 0;
        else newReadStatus = ReadStatus[0].STATUS;


        res.render('layout.ejs', {
            title : 'Books',
            body : ['OneBookPage','partials/navbar/navbar'],
            user : null,
            bookID : id,
            book: books[0],
            author: authors,
            publisher: publisher,
            rid : session.userid,
            ReadStatus : newReadStatus,
            ownReview : userReview,
            othersReview : otherReview,
            summary : reviewSummary
            //books
            //errors : errors
        })

    }
    
});


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

router.post('/books/readStatus/:id', async (req, res) => {
    session = req.session;
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        //console.log(str);
        const id = req.params.id;
        let str = '/books/' + id;
       // console.log(str);
       let RS = req.body.ReadStatus;
       console.log(RS);
       ReadStatus = await DB_RelSearches.getReadStatusForBook(session.userid, id);
       let results;
       if(ReadStatus.length == 0){
            results = await DB_inserts.insertReadStatus(session.userid, id, RS);
       }
       else{
           if(RS == 4){
            results = await DB_Deletes.resetReadStatus(session.userid, id);
           }
           else{
            results = await DB_Updates.updateReadStatus(session.userid, id, RS);
           }
       }

        res.redirect(str);
    }

});

router.delete('/review/:id',async (req, res) => {
    session = req.session;
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        console.log(req.params.id);
        const rid = req.params.id.split('-')[0];
        const bid = req.params.id.split('-')[1];
        let results = await DB_review.deleteReview(rid);
        console.log(results);
        res.json({
            redirect : '/books/'+bid
        });
    }
});

router.post('/books/review/:id', async (req, res) => {
    session = req.session;
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else {
        const id = req.params.id;
        const reviewInfo = {
            reviewBody : req.body.reviewBody,
            rating : req.body.rating,
            usr : session.userid,
            book : id
        }

        let result = await DB_review.insertReview(reviewInfo);
        console.log(result);
        res.redirect('/books/'+id);
    }
});



router.get('/publishers/:id', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        const id = req.params.id;
        
        let books;
        //results = DB_getByID;
    
        publisher = await DB_getByID.getByPublisherID(id);
        books = await DB_RelSearches.getBooksByPublisherID(id);
 
        console.log(publisher[0]);
        console.log(books);

        


        res.render('layout.ejs', {
            title : 'Publisher:',
            body : ['OnePublisherPage','partials/navbar/navbar'],
            user : null,
            books: books,
            publisher: publisher[0]
            
            //books
            //errors : errors
        })

    }
    
});


module.exports = router;