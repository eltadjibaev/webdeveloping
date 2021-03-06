var express = require('express');
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// comments new
router.get('/new', middleware.isLoggedIn, function (req, res) {
   Campground.findById(req.params.id, function (err, foundCamp) {
       if(err){
           res.redirect('/campgrounds');
       } else {
           res.render('comments/new', {camp: foundCamp});
       }
   }); 
});

// comments create
router.post('/', middleware.isLoggedIn, function (req, res) {
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
                  req.flash('success', 'Successfully added comment');
                  res.redirect('/campgrounds/'+camp._id);
              } 
           });
       } 
    });
});

//update comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {camp_id: req.params.id, comment: comment});
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

//delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', "Comment deleted");
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

module.exports = router;