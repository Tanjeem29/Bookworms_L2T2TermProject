
const oneDay = 1000 * 60 * 60 * 24;



const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const morgan = require('morgan');

const app = express();
app.listen(3000);
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));

//parse incoming data
app.use(express.json());
app.use(express.urlencoded ( { extended:true } ));

require('dotenv').config()
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
// console.log(process.env.DB_CONNECTSTRING)

const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
DB.startup();




app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// cookie parser middleware
app.use(cookieParser());



const loginRoutes = require('./routes/authroutes/loginRoutes.js');
const registerRoutes = require('./routes/authroutes/registerRoutes.js');
const homeRoutes = require('.//routes/homeRoutes/homeRoutes.js');
const aboutRoutes = require('.//routes/homeRoutes/aboutRoutes.js');
const mainbookRoutes = require('.//routes/bookRoutes/mainbookRoutes.js');
const mainauthorRoutes = require('.//routes/authorRoutes/mainauthorRoutes.js');
const mainreaderRoutes = require('.//routes/readerRoutes/mainreaderRoutes.js');
//photoUpload
const photoUploadRoutes = require('./routes/photoRoutes/photoUploadRoute.js');
//wallpost
const wallPostRoutes = require('./routes/wallPostRoutes/wallpostRoutes.js');
const otherRoutes = require('.//routes/homeRoutes/otherRoutes.js');
const genreRoutes = require('.//routes/genreRoutes/maingenreRoutes.js');







app.use(loginRoutes);
app.use(homeRoutes);
app.use(aboutRoutes);
app.use(mainbookRoutes);
app.use(mainauthorRoutes);
app.use(mainreaderRoutes);
app.use(registerRoutes);
//photoUpload
app.use(photoUploadRoutes);
app.use(wallPostRoutes);

//profile and Dashboard
app.use(otherRoutes);
app.use(genreRoutes);






// app.get('/expt', (req,res)=>{
//     //res.send('<H3>Login</H3>');
//     //res.sendFile('./views/404.html', {root: __dirname});
//     res.render('index', {title: 'Home', books});
// });

// app.get('/expt2', (req,res)=>{
//     //res.send('<H3>Login</H3>');
//     //res.sendFile('./views/404.html', {root: __dirname});
//     res.render('partials/navbar/navbar', {title: 'Home', books});
// });

// app.get('/login2', (req,res)=>{
//     //res.send('<H3>Login</H3>');
//     res.render('Logintemp.ejs', {title: 'Login', books});
//     //res.sendFile('./views/404.html', {root: __dirname});
// });













