/*
// libraries
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middlewares/
////const errorHandling = require('./middlewares/errorHandling');
////const auth = require('./middlewares/auth');

// router
///const router = require('./router/indexRouter');

// app creation
const app = express();

// using libraries
// app.use(fileUpload({ createParentPath : true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(auth);
app.use(morgan('tiny'));

// setting ejs to be view engine
app.set('view engine', 'ejs');

// allow public directory
app.use(express.static('public'));

//app.set('strict routing', true);
// using router
////app.use('/', router);

// using error handling middlware
////app.use(errorHandling.notFound);
////app.use(errorHandling.errorHandler);

module.exports = app; */
/*
netstat -ano | findstr :3000
tskill typeyourPIDhere

*/

const books = [
    {title: 'HP1',  body: 'Sorcerers stone'},
    {title: 'HP2',  body: 'Chamber'},
    {title: 'HP3',  body: 'Azkaban'},

];


const express = require('express');
const morgan = require('morgan');



const app = express();
app.listen(3000);
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



require('dotenv').config()
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
// console.log(process.env.DB_CONNECTSTRING)

app.get('/expt', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('index', {title: 'Home', books});
});

app.get('/expt2', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('partials/navbar/navbar', {title: 'Home', books});
});

app.get('/login2', (req,res)=>{
    //res.send('<H3>Login</H3>');
    res.render('Logintemp.ejs', {title: 'Login', books});
    //res.sendFile('./views/404.html', {root: __dirname});
});

app.get('/login', (req,res)=>{
    res.render('layout.ejs', {
        title : 'Expt',
        body : ['LoginTest'],
        user : null,
        books
        //errors : errors
    })
});


app.get('/about', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('AboutTemp.ejs', {title: 'About', books});
});





const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
DB.startup();
const DB_auth = require(process.env.ROOT + '\\DB\\DB_Auth_Api');
app.post('/login', async (req, res) => {
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
                res.redirect('/');
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
            res.redirect('/login');
            
        } else {
            console.log('rerender');
            res.render('layout.ejs', {
                title : 'Expt',
                body : ['LoginTest'],
                user : null,
                books
                //errors : errors
            })
        }
    } else {
        console.log('last else');
        res.redirect('/');
        return;
    }
});

app.get('/', (req,res)=>{
    //res.send('<H3>Login</H3>');
    //res.sendFile('./views/404.html', {root: __dirname});
    res.render('layout.ejs', {
        title : 'Home',
        body : ['HomeTest','partials/navbar/navbar'],
        user : null,
        books
        //errors : errors
    })
});