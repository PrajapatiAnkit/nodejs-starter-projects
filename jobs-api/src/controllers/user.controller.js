const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/user.model");
const { generateJWTToken } = require("../services/jwt.service");
const ApiResponse = require("../response/api.response");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateJWTToken({
      id: createdUser._id,
      email: createdUser.email,
    });

    const userObj = createdUser.toObject();
    delete userObj.password;

    return res.status(StatusCodes.OK).json({ user: userObj, token: token });
  } catch (error) {
    console.log("registerUserError", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (!user) {
      // return res
      //   .status(StatusCodes.UNAUTHORIZED)
      //   .json({ error: "Invalid email or password" });

      return ApiResponse.error(res, "Invalid email or password", {}, StatusCodes.UNAUTHORIZED);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    const token = generateJWTToken({
      id: userObj._id,
      email: userObj.email,
    });
    //return res.status(StatusCodes.OK).json({ user: userObj, token: token });
    return ApiResponse.success(res, "Login successfull!!!", { user: userObj, token: token }, StatusCodes.OK);
  } catch (error) {
    console.log("loginUserError", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
