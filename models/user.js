const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

  },
  { versionKey: false },
);
userSchema.methods.setPassword = function (password) {
  this.password = crypto.pbkdf2Sync(password, process.env.SALT,
    1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const pass = crypto.pbkdf2Sync(password, process.env.SALT,
    1000, 64, 'sha512').toString('hex');
  return this.password === pass;
};

module.exports = mongoose.model('User', userSchema);
