const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = class UserService {
  static async getUserByUsername(username) {
    const user = await User.findOne({ username });
    if (!user) return null;
    return user;
  }

  static async getUserByToken(token) {
    const user = await User.findOne({ _id: token });
    if (!user) throw Error('User not found');
    return user;
  }

  static async saveUser(user) {
    const newUser = await user.save();
    if (!newUser) throw Error('User not saved');
    return newUser;
  }

  static validPassword(userpassword, password) {
    return crypto.pbkdf2Sync(password, process.env.SALT,
      1000, 64, 'sha512').toString('hex') === userpassword;
  }

  static issueJWT(user) {
    const { _id } = user;

    const expiresIn = '1d';

    const payload = {
      sub: _id,
      iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, process.env.TOKEN_KEY, { expiresIn });

    return {
      token: `Bearer ${signedToken}`,
      expires: expiresIn,
    };
  }
};
