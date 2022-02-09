const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});




router.get('/home', (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        res.render('layout.ejs', {
            title : 'Home',
            body : ['HomeTest','partials/navbar/navbar'],
            user : null,
            books
            //errors : errors
        })
    }
});

module.exports = router;