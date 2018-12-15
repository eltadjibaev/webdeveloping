const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const key = require('../config/key');

passport.serializeUser(function(user, done) {
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: key.GoogleClientID,
    clientSecret: key.GoogleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
     User.findOne({google: profile.id}).then(function(user) {
         if (user) {
             done(null, user);
         } else {
             const newUser = {
                 google: profile.id,
                 fullname: profile.displayName,
                 lastname: profile.name.familyName,
                 firstname: profile.name.givenName,
                 email: profile.emails[0].value,
                 image: profile.photos[0].value //.substring(0, profile.photos[0].value.indexOf('?'))
             };
             new User(newUser).save().then((user) => {
                 done(null, user);
             });
         }
     });
  }
));