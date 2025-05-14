const { StatusCodes } = require("http-status-codes");

const ApiResponse = {
  success: (res, message = "Success", data = {}, code = StatusCodes.OK) => {
    return res.status(code).json({ message, data });
  },
  error: (res, message = "Error", errors = {}, code = StatusCodes.INTERNAL_SERVER_ERROR) => {
    return res.status(code).json({ message, errors });
  },
};

module.exports = ApiResponse;
