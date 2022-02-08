const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});




router.get('/about', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('layout.ejs', {
        title : 'About',
        body : ['AboutTest','partials/navbar/navbar'],
        user : null,
        books
        //errors : errors
    })
});

module.exports = router;