const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.use('signup', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.log(`Error in SignUp: ${err}`);
          return done(err);
        }

        if (user) {
          console.log(`User already exists with username: ${username}`);
          return done(null, false, { message: 'User already exist' });
        }

        const newUser = new User();

        newUser.username = username;
        newUser.password = password;
        newUser.setPassword(password);

        newUser.save((error) => {
          if (error) {
            console.log(`Error in Saving user: ${error}`);
            throw err;
          }
          console.log('User Registration succesful');
          return done(null, newUser);
        });
        return done(null, false, { message: 'Incorrect' });
      });
    },
  ));
};
