const mongoose = require("mongoose");

const isMongoseIdValid = (id) => {
  // This ensures ID is exactly 24 hex characters and valid
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = isMongoseIdValid;
