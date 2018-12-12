var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// index - show all campgrounds
router.get('/', function (req, res) {
    // get all campgrounds from db
    Campground.find({}, function (err, dbData) {
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: dbData});
        }
    })
});

// create - add new capmground to db
router.post('/', middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = { id: req.user._id, username: req.user.username };
    var newCamp = {name: name, image: image, description: desc, author: author};
    // Create a new campground and save to db
    Campground.create(newCamp, function (err, camp) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// new - show from to create new campground
router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

// show - shows more info about one campground
router.get('/:id', function (req, res) {
    //find the compground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/show', {camp: foundCampground});
        }
    });
});

// edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function (err, foundId) {
        res.render('campgrounds/edit', {camp: foundId}); 
    });
});

// update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, camp) {
        if(err){
            return res.redirect('/campgrounds');
        }
        res.redirect('/campgrounds/'+req.params.id);
    });
});

// delete campground route
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds')
        }
    });
});

module.exports = router;
