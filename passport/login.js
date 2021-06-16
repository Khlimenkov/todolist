const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/UserService');

module.exports = (passport) => {
  passport.use('login', new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await UserService.getUserByUsername(username);
        const checkPassword = UserService.validPassword(user.password, password);

        if (user === null) throw new Error('User not registered');

        if (!checkPassword) throw new Error('Incorrect password');

        return done(null, user);
      } catch (e) {
        return done(e, false, { message: e.message });
      }
    },
  ));
};
