const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false },
);
module.exports = mongoose.model('Task', taskSchema);
