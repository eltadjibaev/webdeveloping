var bodyParser   = require('body-parser'),
methodOverride   = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose         = require('mongoose'),
express          = require('express'),
app              = express();

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static('public'));
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: 'Test Blog',
//     image: 'https://pixabay.com/get/eb37b80c2bf7063ed1584d05fb1d4e97e07ee3d21cac104491f2c27ea4eeb2b8_340.jpg',
//     body: "HELLO THIS IS A BLOG POST!"
// });
    

// RESTFUL ROUTES

app.get('/', function (req, res) {
    res.redirect('/blog');
});

// INDEX ROUTE
app.get('/blog', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get('/blog/new', function (req, res) {
    res.render('new');
})

// CREATE ROUTE
app.post('/blog', function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if(err){
            res.render('new');
        } else {
            res.redirect('/blog');
        }
    });
});

// SHOW ROUTE
app.get('/blog/:id', function (req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
       if(err){
           res.redirect('/blog');
       } else {
           res.render('show', {blog: foundBlog});
       }
   }); 
});

//EDIT ROUTE
app.get('/blog/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if(err){
            res.redirect('/blog');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put('/blog/:id', function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if(err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete('/blog/:id', function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err){
            res.redirect('/blog');
        } else {
            res.redirect('/blog');
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server is running!');
});