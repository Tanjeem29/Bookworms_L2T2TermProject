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
// DB.startup();
//const DB_Searches = require(process.env.ROOT + '\\DB\\DB_Searches');
const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
const DB_updates = require(process.env.ROOT + '\\DB\\DB_Updates');
const DB_wallpost = require(process.env.ROOT + '\\DB\\DB_wallpost');
const DB_reaction = require(process.env.ROOT + '\\DB\\DB_reaction');

/*router.get('/test',async (req,res) => {
    session = req.session;
    //No Login access tried, so redirect to login
    // if(!session.userid){
    //     console.log('NO SESSION!!!!!');
    //     res.redirect('/login');
    // }
    // else{
        //fetching wallpost here: 
        let results = await DB_wallpost.fetchWallPost(3);
        for(var i = 0; i < results.length ; i++) {

        }
        console.log(results);

        res.render('./partials/wallPost/showWallPost.ejs', {
            title : 'Home',
            body : ['HomeTest','partials/navbar/navbar'],
            user : null,
            createWallPost : true,
            showWallPost : true,
            wallposts : results
            //books
            //errors : errors
        });
    //}   
}); */


router.get('/home',async (req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        //fetching wallpost here: 
        let results = await DB_wallpost.fetchWallPost(session.userid);
        for(var i = 0; i < results.length ; i++) {
            let reaction = await DB_reaction.getReactionStatus(results[i].WALLPOST_ID, session.userid);
            results[i].REACTION_STATUS = reaction[0].STATUS;
        }
        console.log(results);

        res.render('layout.ejs', {
            title : 'Home',
            body : ['HomeTest','partials/navbar/navbar'],
            user : null,
            createWallPost : true,
            showWallPost : true,
            wallposts : results,
            //books
            //errors : errors
        });
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
        let path;
        console.log(results);
        console.log(results[0].USERNAME);
        
        //photo handling
        if(results[0].PHOTO == null) {
            console.log("Dummyy");
            path = "dummy.png";
        }
        else {
            path = results[0].PHOTO;
        }
        console.log(path);
        res.render('layout.ejs', {
            title : 'Edit Profile',
            body : ['HomeEdit','partials/navbar/navbar'],
            form:{
                reader: results[0],
                username: results[0].USERNAME,
                password: results[0].PASSWORD,
                fname: results[0].FIRST_NAME,
                lname: results[0].LAST_NAME,
                photo: path,
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
        console.log(req.body);

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