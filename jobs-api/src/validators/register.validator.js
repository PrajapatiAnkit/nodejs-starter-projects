const { StatusCodes } = require("http-status-codes");
const { make } = require("simple-body-validator");

const registerValidator = (req, res, next) => {
  const rules = {
    name: "required|alpha|min:3",
    email: "required|email",
    password: "required|min:6|max:12",
  };

  const validator = make(req.body, rules);
  if (!validator.validate()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validator.errors().all() });
  }
  next();
};

module.exports = registerValidator;
