var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('The server has started!!');
});