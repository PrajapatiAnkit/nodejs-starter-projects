const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [10, "Name should be within 10 chars"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
