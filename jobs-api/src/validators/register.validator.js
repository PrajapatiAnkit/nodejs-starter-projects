const { StatusCodes } = require("http-status-codes");
const { make } = require("simple-body-validator");
const ApiResponse = require("../response/api.response");

const registerValidator = (req, res, next) => {
  const rules = {
    name: "required|alpha|min:3",
    email: "required|email",
    password: "required|min:6|max:12",
  };

  const validator = make(req.body, rules);
  if (!validator.validate()) {
    return ApiResponse.error(res, "Request validation failed", validator.errors().all(), StatusCodes.BAD_REQUEST);
  }
  next();
};

module.exports = registerValidator;
