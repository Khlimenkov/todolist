const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.use('login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        if (user.validPassword(password)) {
          return done(null, user);
        }
        console.log('dasdasd');
        return done(null, false, { message: 'Incorrect password' });
      });
    },
  ));
};
