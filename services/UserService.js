const crypto = require('crypto');
const User = require('../models/user');

module.exports = class UserService {
  static async getUserByUsername(username) {
    const user = await User.findOne({ username });
    if (!user) return null;
    return user;
  }

  static async saveUser(user) {
    const newUser = await user.save();
    if (!newUser) throw Error('User not saved');
    return newUser;
  }

  static setPassword(password) {
    return crypto.pbkdf2Sync(password, process.env.SALT,
      1000, 64, 'sha512').toString('hex');
  }

  static validPassword(userpassword, password) {
    return crypto.pbkdf2Sync(password, process.env.SALT,
      1000, 64, 'sha512').toString('hex') === userpassword;
  }
};
