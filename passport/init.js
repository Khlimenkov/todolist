const User = require('../models/user');
const login = require('./login');
const signup = require('./signup');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializing user:', user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  login(passport);
  signup(passport);
};
