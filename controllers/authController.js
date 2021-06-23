const UserService = require('../services/UserService');
const User = require('../models/user');

exports.login = async (req, res) => {
  try {
    const user = await UserService.getUserByUsername(req.body.username);
    if (user === null) throw Error('User not registered');
    const checkPasswrd = UserService.validPassword(user.password, req.body.password);
    if (!checkPasswrd) throw Error('Incorrect password');
    const tokenObject = UserService.issueJWT(user);
    res.status(200).json({
      succes: true, user, token: tokenObject.token, expires: tokenObject.expires,
    });
  } catch (e) {
    res.status(401).json({ succes: false, msg: e.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = await UserService.getUserByUsername(req.body.username);
    if (user !== null) throw Error(`This username: ${req.body.username} already exist`);

    const newUser = new User();

    newUser.username = req.body.username;
    newUser.password = req.body.password;

    const resUser = await UserService.saveUser(newUser);
    if (!resUser) throw Error('Dont save');
    const tokenObject = UserService.issueJWT(resUser);
    res.json({
      success: true, resUser, token: tokenObject.token, expires: tokenObject.expires,
    });
  } catch (e) {
    res.status(401).json({ succes: false, msg: e.message });
  }
};
