var express = require('express');
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// comments new
router.get('/new', isLoggedIn, function (req, res) {
   Campground.findById(req.params.id, function (err, foundCamp) {
       if(err){
           res.redirect('/campgrounds');
       } else {
           res.render('comments/new', {camp: foundCamp});
       }
   }); 
});

// comments create
router.post('/', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           Comment.create(req.body.comment, function (err, comment) {
              if(err){
                  console.log(err);
                  res.redirect('/campgrounds');
              } else {
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  camp.comments.push(comment);
                  camp.save();
                  res.redirect('/campgrounds/'+camp._id);
              } 
           });
       } 
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;