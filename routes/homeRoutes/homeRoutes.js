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
//const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
const DB_updates = require(process.env.ROOT + '\\DB\\DB_Updates');


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

router.get('/home/edit', async(req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let results = await DB_getByID.getByReaderID(session.userid);
        console.log(results);
        console.log(results[0].USERNAME);

        res.render('layout.ejs', {
            title : 'Edit Profile',
            body : ['HomeEdit','partials/navbar/navbar'],
            form:{
                reader: results[0],
                username: results[0].USERNAME,
                password: results[0].PASSWORD,
                fname: results[0].FIRST_NAME,
                lname: results[0].LAST_NAME,
                bio: results[0].BIO
            }

            //errors : errors
        })
    }
});


router.post('/home/edit', async(req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let results = await DB_getByID.getByReaderID(session.userid);
        let errors = [];
        console.log(results);
        console.log(results[0].USERNAME);
        
        console.log(req.body)
        if(results[0].PASSWORD != req.body.password){
            console.log('new pass');
            if(req.body.password != req.body.password2){
                errors.push('Password confirmation doesn\'t match with password');
            }
        // check if password has at least 6 char
            if(req.body.password.length < 6){
                errors.push('Password must be at least 6 characters');
            }
        }

        if(errors.length>0){
            console.log(errors);
            res.render('layout.ejs', {
                title : 'Edit Profile',
                body : ['HomeEdit','partials/navbar/navbar'],
                form:{
                    reader: results[0],
                    username: req.body.username,
                    password: req.body.password,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    bio: req.body.bio
                }

                //errors : errors
            })
        }
        else{

            let q = await DB_updates.updateReaderByID(session.userid, req.body.username, req.body.password, req.body.fname, req.body.lname, req.body.bio); 
            console.log(q);
            res.redirect('/');
        }
    }
});

module.exports = router;