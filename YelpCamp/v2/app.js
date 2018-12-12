var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// schema setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//     name: 'Granite Hill',
//     image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg",
//     description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log('newly created campground: ');
//         console.log(campground);
//     }
// });

// var campgrounds = [
//         {name: 'Salmon Creek', image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
//         {name: 'Granite Hill', image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
//         {name: 'Salmon Creek', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
//         {name: 'Granite Hill', image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
//         {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
//         {name: 'Granite Hill', image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
//         {name: 'Salmon Creek', image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
//         {name: 'Granite Hill', image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
//     ];

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
            res.render('index', {campgrounds: dbData});
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
    res.render('new');
});

// show - shows more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    //find the compground with provided id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render('show', {camp: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('The yelpCamp server has started!!');
});