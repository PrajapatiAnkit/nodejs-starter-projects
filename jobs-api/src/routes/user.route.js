const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const registerValidator = require("../validators/register.validator");
const loginValidator = require("../validators/login.validator");
const userRouter = express.Router();

userRouter.route("/register").post(registerValidator, registerUser);
userRouter.route("/login").post(loginValidator, loginUser);

module.exports = userRouter;
