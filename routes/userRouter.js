const express = require('express');

const userRouter = express.Router();

module.exports = (passport) => {
  userRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.cookie('user', req.user.id);
    res.send('cookie was added');
  });
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
