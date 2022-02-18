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
    const DB_Genre = require(process.env.ROOT + '\\DB\\DB_Genre');


router.get('/genres', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        genre = await DB_Genre.getGenres();
        //console.log(genre);
        let mainGenre = [];
        let temp;
        for (let i = 0; i < genre.length; i++) {
            temp = await DB_Genre.getBooksByGenreID(genre[i].GENRE_ID);
            //console.log(temp);
            mainGenre.push(temp);
          }
          console.log(mainGenre);



        res.render('layout.ejs', {
            title : 'Genres',
            body : ['GenreTest','partials/navbar/navbar'],
            user : null,
            genres : mainGenre,
            //errors : errors
        })
    }
    
});

module.exports = router;