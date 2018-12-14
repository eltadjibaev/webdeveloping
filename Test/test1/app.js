var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');
    
mongoose.connect('mongodb://localhost:27017/yelp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Camp = mongoose.model('Camp', campSchema);

// Camp.create({
//     name: 'Granite Hill',
//     image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144597f2c078a7e4bc_340.jpg",
//     desc: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// }, function (err, camp) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log('newly created camp!');
//         console.log(camp);
//     }
// });

app.get('/', function (req, res) {
    res.render('home');
})

app.get('/camp', function (req, res) {
    Camp.find({}, function (err, dbinfo) {
        if(err){
            console.log(err);
        } else {
            res.render('camp', {camps: dbinfo});
        }
    })
});

app.post('/camp', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    Camp.create({name: name, image: image, desc: desc}, function (err, camp) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/camp');
        }
    })
});

app.get('/camp/new', function (req, res) {
    res.render('new');
});

app.get('/camp/:id', function (req, res) {
   Camp.findById(req.params.id, function (err, found) {
       if(err){
            console.log(err);
        } else {
            res.render('show', {info: found});
        }
   })
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Camp server has started!");
});