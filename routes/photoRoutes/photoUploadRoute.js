
const multer = require('multer');
const express = require('express');
const fs = require('fs');
//const session = require('express-session');
const path = require('path');

require('dotenv').config();

const router = express.Router({mergeParams: true});

const upload = multer({
    dest : __dirname + "/public"
});


router.get('/upload', (req, res) => {
    session = req.session;
    if(!session.userid) {
        console.log('NO SESSION!!!');
        res.redirect('./login');
    }
    else {
        res.render('layout.ejs', {
            title : 'Photo_Upload' ,
            body : ['photoUpload'] ,
            user : null
        });
    }
    //render the upload page.
});

router.post('/upload', upload.single("photo"), (req, res) => {
    //parse and save photo.
    session = req.session;
    if(!session.userid) {
        console.log('NO SESSION!!!');
        res.redirect('./login');
    }
    else {
        const tempPath = req.file.path;
        const savePathPng = path.join("./public/"+ session.userid + ".png");
        const savePathJPG = path.join("./public/"+ session.userid + ".jpg");
        if(path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, savePathPng, (err) => {
                console.log("******Some Error Occured Uploading*******");
                if(err) {
                    return err;
                }
            });
            console.log("Photo Saved!");
        }
        if(path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, savePathJPG, (err) => {
                if(err) {
                    console.log("******Some Error Occured Uploading*******");
                    return err;
                }
            });
            console.log("Photo Saved!");
        }
        else {
            console.log("Extension Error!");
        }
        res.redirect('/home');
    }
});

module.exports = router;
