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



const loginRoutes = require('./routes/authroutes/loginRoutes.js');
const registerRoutes = require('./routes/authroutes/registerRoutes.js');
const homeRoutes = require('.//routes/homeRoutes/homeRoutes.js');
const aboutRoutes = require('.//routes/homeRoutes/aboutRoutes.js');
const mainbookRoutes = require('.//routes/bookRoutes/mainbookRoutes.js');



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



app.use(loginRoutes);
app.use(homeRoutes);
app.use(aboutRoutes);
app.use(mainbookRoutes);
app.use(registerRoutes);
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













