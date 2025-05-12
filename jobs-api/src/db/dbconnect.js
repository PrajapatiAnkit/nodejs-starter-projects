const mongoose = require("mongoose");

const connectMongoDB = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectMongoDB;
