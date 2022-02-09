const express = require('express');
require('dotenv').config();
const router = express.Router({mergeParams : true});
//const passport = require('passport');

// const books = [
//     {title: 'HP1',  body: 'Sorcerers stone'},
//     {title: 'HP2',  body: 'Chamber'},
//     {title: 'HP3',  body: 'Azkaban'},

// ];



router.get('/', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.redirect('/login');
});


router.get('/login', (req,res)=>{
    res.render('layout.ejs', {
        title : 'Login',
        body : ['LoginTest'],
        user : null,
        //books
        //errors : errors
    })
});




const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
DB.startup();
const DB_auth = require(process.env.ROOT + '\\DB\\DB_Auth_Api');



router.post('/login', async (req, res) => {
    // console.log(req.body.email);
    // console.log(req.body.password);
    //console.log(process.env.DB_USER);
    //console.log(req);
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        results = await DB_auth.getRIDByEmail(req.body.email);
        
        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such user found');
            console.log('No result found');
        } else {
            // match passwords
            console.log(results[0])
            if(req.body.password == results[0].PASSWORD){
                console.log(results[0].PASSWORD);
                console.log('OKK');

                //Cookie goes here
                res.redirect('/home');
                return;
                
            }
            // const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
            // if(match){
            //     // if successful login the user
            //     await authUtils.loginUser(res, results[0].ID);
            // }
            else{
                console.log(req.body.password);
                errors.push('wrong password');
                console.log('wrong pass');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            console.log('home');
            res.redirect('/home');
            
        } else {
            console.log('rerender');
            res.render('layout.ejs', {
                title : 'Expt',
                body : ['LoginTest'],
                user : null,
                form : {
                    email : req.body.email,
                    password : req.body.password
                }
                //books
                //errors : errors
            })
        }
    } else {
        console.log('last else');
        res.redirect('/home');
        return;
    }
});


module.exports = router;