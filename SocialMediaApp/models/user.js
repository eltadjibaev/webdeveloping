const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    phone: Number,
    location: String,
    fbTokens: Array,
    facebook: String,
    google: String,
    instagram: String
});

module.exports = mongoose.model('user', userSchema);