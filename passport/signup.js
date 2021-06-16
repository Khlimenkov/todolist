const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const UserService = require('../services/UserService');

module.exports = (passport) => {
  passport.use('signup', new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await UserService.getUserByUsername(username);
        if (user !== null) throw Error(`This username: ${username} already exist`);

        const newUser = new User();

        newUser.username = username;
        newUser.password = UserService.setPassword(password);

        const resUser = await UserService.saveUser(newUser);
        if (!resUser) throw Error('Dont save');
        return done(null, newUser);
      } catch (e) {
        return done(e, false, { message: e.message });
      }
    },
  ));
};
