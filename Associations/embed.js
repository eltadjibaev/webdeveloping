var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_demo', { useNewUrlParser: true });

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model('Post', postSchema);

//  USER - EMAIL, NAME
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model('User', userSchema);

// var newUser = new User ({
//     email: 'eljibaev@mail.ru',
//     name: 'ELMUROD TADJIBAEV'
// });

// newUser.posts.push ({
//     title: 'hello polyjuicy',
//     content: 'It is me, Jhon!'
// });

// newUser.save(function (err, user) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

User.findOne({name: 'ELMUROD TADJIBAEV'}, function (err, user) {
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: 'Node.js qiyinga ohshaydi!',
            content: "Don't worry, be happe!"
        });
        user.save(function (err, user) {
            if(err){
            
            } else {
            console.log(user);
            }
        });
    }
});