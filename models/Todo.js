const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  value: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  sessions: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      description: {
        type: String,
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
      time: {
        type: Number,
      },
    },
  ],
  breaks: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
      time: {
        type: Number,
      },
    },
  ],

  totalTime: {
    type: Number,
  },
  totalBreakTime: {
    type: Number,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
