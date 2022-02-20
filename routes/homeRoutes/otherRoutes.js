
const express = require('express');
const { min } = require('lodash');
require('dotenv').config();
const router = express.Router({mergeParams : true});

// const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
// DB.startup();
const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
const DB_inserts = require(process.env.ROOT + '\\DB\\DB_inserts');
const DB_Deletes = require(process.env.ROOT + '\\DB\\DB_Deletes');
const DB_RelSearches = require(process.env.ROOT + '\\DB\\DB_RelSearches');
const DB_queryPhoto = require(process.env.ROOT + '\\DB\\DB_update_profile_picture');

router.get('/profile', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        const id = session.userid;
        //console.log(id);
        let results;
        //results = DB_getByID;
        reader = await DB_getByID.getByReaderID(id);
        //FollowStatus = await DB_RelSearches.getFollowReader(session.userid, id);
        //console.log(FollowStatus);
        //let FS = FollowStatus.length;


        let booksread = await DB_RelSearches.getBooksByReaderIDStatus(id, 1);
        let booksreading = await DB_RelSearches.getBooksByReaderIDStatus(id, 2);
        let bookswillread = await DB_RelSearches.getBooksByReaderIDStatus(id, 3);
        let commonAuthorsFollowed = await DB_RelSearches.commonAuthorsFollowed(req.session.userid , id);
        //let otherAuthorsFollowed = await DB_RelSearches.otherAuthorsFollowed(req.session.userid , id);

        if(reader[0].PHOTO == null) {
            console.log("Dummy Photo rendering");
            path = "/reader/dummy.png";
        }
        else {
            path = "/reader/" + reader[0].PHOTO;
        }


        //books = await DB_RelSearches.getBooksByAuthorID(id);
        
        // console.log(booksread);
        // console.log(booksreading);
        // console.log(bookswillread);
        //console.log(commonAuthorsFollowed);
        //console.log(otherAuthorsFollowed);
        let reviews = await DB_RelSearches.getBooknReviewByReaderID(id);
        //console.log(reviews);
        let wallposts = await DB_RelSearches.getWallpostByReaderID(id);
        //console.log(wallposts);


        res.render('layout.ejs', {
            title : 'Profile Page:',
            body : ['ProfilePage','partials/navbar/navbar'],
            //user : null,
            reader: reader[0],
            //FollowStatus : FS,
            booksread : booksread,
            booksreading : booksreading,
            bookswillread : bookswillread,
            //otherAuthors : otherAuthorsFollowed,
            commonAuthors : commonAuthorsFollowed,
            photo : path
            //books : books
            //books
            //errors : errors
        })


    }
    
});


router.get('/dashboard', async (req, res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        const id = session.userid;
        reader = await DB_getByID.getByReaderID(id);
        books = await DB_RelSearches.getAllBooksByReaderID(id);
        //console.log(books)
        bLen = Math.min(books.length, 5)
        //console.log(books.length);
        Afollows = await DB_RelSearches.getAuthorsFollowedByReaderID(id);
        //console.log(Afollows)
        AfLen = Math.min(Afollows.length, 3)

        Rfollows = await DB_RelSearches.getReadersFollowedByReaderID(id);
        //console.log(Rfollows)
        RfLen = Math.min(Rfollows.length, 3)

        followers = await DB_RelSearches.getFollowersByReaderID(id);
        fbLen = Math.min(followers.length, 3)
        console.log(followers)

        res.render('layout.ejs', {
            title : 'Dashboard',
            body : ['Dashboard','partials/navbar/navbar'],
            //user : null,
            reader: reader[0],
            books : books,
            bLen : bLen,
            Afollows : Afollows,
            AfLen : AfLen,
            Rfollows : Rfollows,
            RfLen : RfLen,
            followers : followers,
            fbLen : fbLen,
            
            //Uncooment when Wallpost, reviews done
            // reviews : null,
            // rLen : Math.min(reviews.length, 3),
            // wallposts : null,
            // wlen : Math.min(wallposts.length, 3)

            //errors : errors
        })
        




    }


});


module.exports = router;