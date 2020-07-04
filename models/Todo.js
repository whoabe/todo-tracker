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
    },
  ],
  totalTime: {
    type: Number,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
