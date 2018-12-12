var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment'),
    seedDB       = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', function (req, res) {
    res.render('landing');
});

// index - show all campgrounds
app.get('/campgrounds', function (req, res) {
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
app.post('/campgrounds', function (req, res) {
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
app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
});

// show - shows more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    //find the compground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', {camp: foundCampground});
        }
    });
});

//===================
//  COMMENTS ROUTE
//===================

app.get('/campgrounds/:id/comments/new', function (req, res) {
   Campground.findById(req.params.id, function (err, foundCamp) {
       if(err){
           res.redirect('/campgrounds');
       } else {
           res.render('comments/new', {camp: foundCamp});
       }
   }); 
});

app.post('/campgrounds/:id/comments', function (req, res) {
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
                  camp.comments.push(comment);
                  camp.save();
                  res.redirect('/campgrounds/'+camp._id);
              } 
           });
       } 
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('The yelpCamp server has started!!');
});