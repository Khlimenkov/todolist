const mongoose = require('mongoose');

const Shema = mongoose.Schema;

const userShema = new Shema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('User', userShema);
