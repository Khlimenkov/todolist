const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const UserService = require('../services/UserService');
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY,
};

const strategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await UserService.getUserByToken(payload.sub);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
