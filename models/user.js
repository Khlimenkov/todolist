const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
