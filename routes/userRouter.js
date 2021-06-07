const express = require('express');

const userRouter = express.Router();

module.exports = (passport) => {
  userRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.cookie('user', req.user.id);
    res.send('cookie was added');
  });
  // eslint-disable-next-line no-unused-vars
  userRouter.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.cookie('user', req.user.id);
    res.send('cookie was added');
  });
  userRouter.get('/signout', (req, res) => {
    res.clearCookie('user');
    res.send('Logged Out');
  });
  return userRouter;
};
