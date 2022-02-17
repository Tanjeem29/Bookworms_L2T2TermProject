
const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const DB_getByID = require(process.env.ROOT + '\\DB\\DB_getByID');
const DB_updates = require(process.env.ROOT + '\\DB\\DB_Updates');
const DB_queryPhoto = require(process.env.ROOT + '\\DB\\DB_update_profile_picture');

//const session = require('express-session');



require('dotenv').config();

const router = express.Router({mergeParams: true});

const upload = multer({
    dest : __dirname + "/public/reader"
});


router.get('/upload', async (req, res) => {
    session = req.session;
    if(!session.userid) {
        console.log('NO SESSION!!!');
        res.redirect('./login');
    }

    else {
        let results = await DB_getByID.getByReaderID(session.userid);
        //edit to absolute path /reader
        let path;
        console.log(results);
        console.log(results[0].USERNAME);

        //photo handling
        if(results[0].PHOTO == null) {
            console.log("Dummy Photo rendering");
            path = "/reader/dummy.png";
        }
        else {
            path = "/reader/" + results[0].PHOTO;
        }
        console.log(path);
        res.render('layout.ejs', {
            title : 'Edit Profile',
            body : ['photoUpload','partials/navbar/navbar'],
            form:{
                reader: results[0],
                username: results[0].USERNAME,
                password: results[0].PASSWORD,
                fname: results[0].FIRST_NAME,
                lname: results[0].LAST_NAME,
                photo: path,
                bio: results[0].BIO
            }
        });
        //errors : errors
    }
});

router.post('/save_photo', upload.single("photo"),async (req, res) => {
    //parse and save photo.
    session = req.session;
    if(!session.userid) {
        console.log('NO SESSION!!!');
        res.redirect('./login');
    }

    else {
        if(req.file != null) {
            const tempPath = req.file.path;
            //edit /reader
            let savePath = path.join("./public/reader/"+session.userid);
            let extension;

            //first check if there exists a profile picture already. If exists, delete it.
            let results = await DB_queryPhoto.getPhotoByID(session.userid);
            console.log(session.userid);
            if(results[0].PHOTO == null) {
                console.log("No profile Picture Found!");
            }
            else {
                const oldpath = results[0].PHOTO;
                console.log(results[0].PHOTO);
                //edit /reader
                fs.unlinkSync("./public/reader/"+oldpath, (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
                console.log("Old profile Picture deleted!");
            }

            //saving photo
            if(path.extname(req.file.originalname).toLowerCase() === ".png") {
                extension = ".png";
                fs.rename(tempPath, savePath+extension, (err) => {
                    console.log("******Some Error Occured Uploading*******");
                    if(err) {
                        return err;
                    }
                });
                console.log("Photo Saved as .png!");
            }
            else if(path.extname(req.file.originalname).toLowerCase() === ".jpg") {
                extension = ".jpg";
                fs.rename(tempPath, savePath+extension, (err) => {
                    if(err) {
                        console.log("******Some Error Occured Uploading*******");
                        return err;
                    }
                });
                console.log("Photo Saved as .jpg!");
            }
        
            //pushing new path to Database
            console.log(savePath);
            await DB_queryPhoto.updatePhotoByID((session.userid)+extension, session.userid);
            console.log("Successfully set new profile picture!");
        }
        //redirecting home
        res.redirect('/upload');
    }
});

router.post('/upload', async(req,res)=>{
    session = req.session;
    //No Login access tried, so redirect to login
    if(!session.userid){
        console.log('NO SESSION!!!!!');
        res.redirect('/login');
    }
    else{
        let results = await DB_getByID.getByReaderID(session.userid);
        let path;
        let errors = [];
        console.log(results);
        console.log(results[0].USERNAME);
        console.log(req.body);

        if(results[0].PHOTO == null) {
            console.log("Dummy Photo rendering");
            path = "/reader/dummy.png";
        }
        else {
            path = "/reader/" + results[0].PHOTO;
        }

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
                body : ['photoUpload','partials/navbar/navbar'],
                form:{
                    reader: results[0],
                    username: req.body.username,
                    password: req.body.password,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    photo: path,
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
