const { StatusCodes } = require("http-status-codes");
const { make } = require("simple-body-validator");
const ApiResponse = require("../response/api.response");

const loginValidator = (req, res, next) => {
  const rules = {
    email: "required|email",
    password: "required|min:6|max:12",
  };

  const validator = make(req.body, rules);
  if (!validator.validate()) {
    return ApiResponse.error(res, "Request validation failed", validator.errors().all(), StatusCodes.BAD_REQUEST);
  }
  next();
};

module.exports = loginValidator;
