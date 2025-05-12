const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports = mongoose.model("Job", JobsSchema);
