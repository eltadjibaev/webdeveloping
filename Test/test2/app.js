var bodyParser   = require('body-parser'),
methodOverride   = require('method-override'),
mongoose         = require('mongoose'),
expressSanitizer = require('express-sanitizer'),
express          = require('express'),
app              = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/book_app', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static('public'));
app.use(methodOverride('_method'));

var bookSchema = new mongoose.Schema ({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Book = mongoose.model('Book', bookSchema);

// Book.create({
//   title: 'The Last Samurai, by Helen DeWitt',
//   image: 'https://pixabay.com/get/eb36b80f29f7073ed1584d05fb1d4e97e07ee3d21cac104491f2c47bafeeb7bc_340.jpg',
//   body: 'Ask a set of writers and critics to select books for a new canon, and it shouldn’t come as a shock that the one most of them name is a novel about the nature of genius. It is also, more precisely, a novel about universal human potential.'
// });

app.get('/', function (req, res) {
    res.redirect('/books');
});

app.get('/books', function (req, res) {
    Book.find({}, function (err, foundBooks) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {books: foundBooks});
        }
    });
});

app.get('/books/new', function (req, res) {
    res.render('new');
});

app.post('/books', function (req, res) {
   req.body.book.body = req.sanitize(req.body.book.body);
   Book.create(req.body.book, function (err, createdBook) {
       if(err){
            res.render('new');
        } else {
            res.redirect('/books');
        }
   });
});

app.get('/books/:id', function (req, res) {
    Book.findById(req.params.id, function (err, foundBook) {
        if(err){
            res.redirect('/books');
        } else {
            res.render('show', {book: foundBook});
        }
    });
});

app.get('/books/:id/edit', function (req, res) {
   Book.findById(req.params.id, function (err, foundBook) {
       if(err){
            res.redirect('/books');
        } else {
            res.render('edit', {book: foundBook});
        }
   });    
});

app.put('/books/:id', function (req, res) {
    req.body.book.body = req.sanitize(req.body.book.body);
    Book.findByIdAndUpdate(req.params.id, req.body.book, function (err, updatedBook) {
        if(err){
            res.redirect('/books');
        } else {
            res.redirect('/books/'+req.params.id);
        }
    });
});

app.delete('/books/:id', function (req, res) {
   Book.findByIdAndRemove(req.params.id, function (err) {
      if(err){
            res.redirect('/books');
        } else {
            res.redirect('/books');
        } 
   }); 
});


app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server is running!');
});