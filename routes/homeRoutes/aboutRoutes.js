const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});

const DB_quotes = require(process.env.ROOT + '\\DB\\DB_Quotes');


router.get('/about', async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let quotes = await DB_quotes.getRandomQuote();

        res.render('layout.ejs', {
            title : 'About',
            body : ['AboutTest','partials/navbar/navbar'],
            user : null,
            Quotes : quotes[0],
            //errors : errors
        })
    }
});

module.exports = router;