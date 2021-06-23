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

userSchema.pre(
  'save',
  async function (next) {
    const hash = crypto.pbkdf2Sync(this.password, process.env.SALT,
      1000, 64, 'sha512').toString('hex');
    this.password = hash;
    next();
  },
);

module.exports = mongoose.model('User', userSchema);
