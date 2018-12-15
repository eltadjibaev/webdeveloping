// Load modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
// Connect to MongoURI exported from external file
const key = require('./config/key');
// user collection
const User = require('./models/user');
require('./passport/google-passport');
// initialize application
const app = express();
// Express config
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({
     extended: false
 }));
 app.use(bodyParser.json());
 app.use(session({
     secret: 'keyboard cat',
     resave: true,
     saveUninitialized: true
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 //set global vars for user
 app.use(function(req, res, next) {
     res.locals.user = req.user || null;
     next();
 });
// setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// setup static file to serve css, javascript and images
app.use(express.static('public'));
// connect to remote database
mongoose.Promise = global.Promise;
mongoose.connect(key.MongoURI, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to Remote Database....');
}).catch((err) => {
    console.log(err);
});

// Handle routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});
// GOOGLE AUTH ROUTE
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });
app.get('/profile', (req, res) => {
    User.findById(req.user._id, function(err, findId) {
        console.log(req.user);
        if(err){
            console.log("hato");
        } else {
            res.render("profile", {user: findId});
        }
    })
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('The Server has started!!');
});
