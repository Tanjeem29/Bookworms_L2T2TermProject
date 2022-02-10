const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});




//const passport = require('passport');

// const books = [
//     {title: 'HP1',  body: 'Sorcerers stone'},
//     {title: 'HP2',  body: 'Chamber'},
//     {title: 'HP3',  body: 'Azkaban'},

// ];





router.get('/register', (req,res)=>{
    res.render('layout.ejs', {
        title : 'Register',
        body : ['RegisterTest'],
        user : null,
        //books
        //errors : errors
    })
});




// const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
// DB.startup();
const DB_auth = require(process.env.ROOT + '\\DB\\DB_Auth_Api');


router.post('/register', async (req, res) => {
    if(req.user == null){
        let results, errors = [];

        // check if email is alredy used or not
        results = await DB_auth.getRIDByEmail(req.body.email);
        if(results.length > 0)
            errors.push('Email is already registered to a user');

        // check if password confimation is right
        if(req.body.password !== req.body.password2)
            errors.push('Password confirmation doesn\'t match with password');

        // check if password has at least 6 char
        if(req.body.password.length < 6){
            errors.push('Password must be at least 6 characters');
        }
        

        // if there are errors, redirect to sign up but with form informations
        if(errors.length > 0){
            res.render('layout.ejs', {
                title : 'Register',
                body : ['RegisterTest'],
                user : null,
                //errors : errors,
                form : {
                    email : req.body.email,
                    username : req.body.username,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    password : req.body.password,
                    password2 : req.body.password2,
                }
            });
        }
        else{
            // if no error, create user object to be sent to database api
            let user = {
                email : req.body.email,
                username : req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                password : req.body.password,
                born: req.body.born
            }
            let result = await DB_auth.createNewReader(user);
            console.log(user);
            console.log(result);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;