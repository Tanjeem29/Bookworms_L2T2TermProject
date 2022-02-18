const express = require('express');
//const session = require('express-session');
require('dotenv').config();
const router = express.Router( {mergeParams: true} );

const DB_wallpost = require(process.env.ROOT + '\\DB\\DB_wallpost');
const DB_reaction = require(process.env.ROOT + '\\DB\\DB_reaction');

router.get('/wallpost/:id', async (req, res) => {
    session = req.session;
    if(!session.userid) {
        console.log('NO SESSION!!!');
        res.redirect('./login');
    }
    else {
        //*********incomplete Code**********
        let postid = req.params.id;
        console.log(postid);
        res.redirect('./home');
    }

})

router.post('/createWallPost',async (req, res) => {
    session = req.session;
    if(!session.userid) {
        console.log("No Session!!!!");
        res.redirect('/login');
    }
    else {
        wallpost = {
            postBody : req.body.wallPost_body,
            uid : session.userid
        }
        console.log('Inserting new Wallpost: ');
        //console.log(wallpost);
        await DB_wallpost.insertWallPost(wallpost);
        console.log('New wallpost inserted');
        
        //redirecting to home
        res.redirect('/home');
        //errors : errors;
    }
});

router.post('/wallpost/like/:id',async (req,res) => {
    session = req.session;
    if(!session.userid) {
        console.log("No Session!!!!");
        res.redirect('/login');
    }
    else {
        const wallid = req.params.id;
        await DB_reaction.insertReactionStatus(wallid, session.userid);
        res.redirect('/home');
    }
});

router.post('/wallpost/unlike/:id', async (req,res) => {
    session = req.session;
    if(!session.userid) {
        console.log("No Session!!!!");
        res.redirect('/login');
    }
    else {
        const wallid = req.params.id;
        await DB_reaction.deleteReactionStatus(wallid, session.userid);
        res.redirect('/home');
    }
});


module.exports = router;