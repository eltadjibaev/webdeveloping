var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
        {name: 'Salmon Creek', image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
        {name: 'Granite Hill', image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
        {name: 'Salmon Creek', image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
        {name: 'Granite Hill', image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
        {name: 'Salmon Creek', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
        {name: 'Granite Hill', image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
        {name: 'Salmon Creek', image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
        {name: 'Granite Hill', image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"},
        {name: 'Salmon Creek', image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg"},
        {name: 'Granite Hill', image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f2c378a6edbcb1_340.jpg"}
    ];

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    campgrounds.push(newCamp);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('The yelpCamp server has started!!');
});