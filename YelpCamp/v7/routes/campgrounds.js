var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');

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
router.post('/', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
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
router.get('/new', function (req, res) {
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

module.exports = router;
