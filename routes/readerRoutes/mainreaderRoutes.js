
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

router.get('/readers', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let quotes = await DB_quotes.getRandomQuote();


        let id = req.session.userid;
        let readers = await DB_RelSearches.readerPageQuery1(id);
        console.log(readers); 
        let RLen = Math.min(readers.length, 5);
        let books = [];
        for(var i = 0; i< RLen; i++){
            let temp = await DB_RelSearches.readerPageQuery2(id, readers[i].READER_ID);
            books.push(temp);
        }
        //console.log(books);



        res.render('layout.ejs', {
            title : 'Readers',
            body : ['ReaderTest','partials/navbar/navbar'],
            user : null,
            readers : readers,
            RLen : RLen,
            books : books,
            Quotes : quotes[0]
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
        //console.log(req.body.search);
        //console.log(res.query);
        let id = req.session.userid;
        let results;
        let fl = req.body.fl;
        let type;
        console.log(fl);


        if(typeof fl == 'undefined'){
            res.redirect('/readers');
        }
        else{

            let quotes = await DB_quotes.getRandomQuote();
            if(fl == 1){
                results = await DB_Searches.searchByReadername(req.body.search);
                type = 'All';
            }
            else if(fl == 2){
                results = await DB_Searches.searchByReadername_Followed(id,req.body.search);
                type = 'Followed';
            }
            else if(fl == 3){
                results = await DB_Searches.searchByReadername_NotFollowed(id,req.body.search);
                type = 'Not Followed';
            }
            //let results = await DB_Searches.searchByReadername(req.body.search);
            //let results = await DB_Searches.searchByReadername_Followed(id, req.body.search);
            //let results = await DB_Searches.searchByReadername_NotFollowed(id, req.body.search);
            //console.log(results);
            res.render('layout.ejs', {
                title : 'Readers',
                body : ['ReaderSearchTest','partials/navbar/navbar', req.body.search],
                user : null,
                SearchResults: results,
                uid : req.session.userid,
                type : type,
                Quotes : quotes[0]
                //books
                //errors : errors
            })
        }


        
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
        let quotes = await DB_quotes.getRandomQuote();


        const id = req.params.id;
        let uid = req.session.userid;
        if(id == uid){
            res.redirect('/profile');
        }
        else{
            let path;
            console.log(id);
            console.log("GENJAAAM");
            let results;
            //results = DB_getByID;
            reader = await DB_getByID.getByReaderID(id);
            FollowStatus = await DB_RelSearches.getFollowReader(session.userid, id);
            //console.log(FollowStatus);
            let FS = FollowStatus.length;


            let booksread = await DB_RelSearches.getBooksByReaderIDStatus(id, 1);
            let booksreading = await DB_RelSearches.getBooksByReaderIDStatus(id, 2);
            let bookswillread = await DB_RelSearches.getBooksByReaderIDStatus(id, 3);
            let commonAuthorsFollowed = await DB_RelSearches.commonAuthorsFollowed(req.session.userid , id);
            let otherAuthorsFollowed = await DB_RelSearches.otherAuthorsFollowed(req.session.userid , id);
            
            //Pic Add (NOTOWRKING)
            console.log('BEFOREEEEEEE')
            if(reader[0].PHOTO == null) {
                console.log("Dummy Photo rendering");
                path = "/reader/dummy.png";
            }
            else {
                console.log('else');
                path = "/reader/" + reader[0].PHOTO;
            }
            console.log('AFTERRERRE')


            //books = await DB_RelSearches.getBooksByAuthorID(id);
            
            // console.log(booksread);
            // console.log(booksreading);
            // console.log(bookswillread);
            // console.log(commonAuthorsFollowed);
            // console.log(otherAuthorsFollowed);



            res.render('layout.ejs', {
                title : 'Reader',
                body : ['OneReaderPage','partials/navbar/navbar'],
                //user : null,
                reader: reader[0],
                FollowStatus : FS,
                booksread : booksread,
                booksreading : booksreading,
                bookswillread : bookswillread,
                otherAuthors : otherAuthorsFollowed,
                commonAuthors : commonAuthorsFollowed,
                photo : path,
                Quotes : quotes[0]
            })

        }
    }
    
});


router.post('/readers/follow/:id', async (req, res) => {
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
                console.log('Inserting FollowReader');
                r = await DB_inserts.insertFollowReader(session.userid, id);
            }
       }
       
       res.redirect(str);
    }


});


module.exports = router;