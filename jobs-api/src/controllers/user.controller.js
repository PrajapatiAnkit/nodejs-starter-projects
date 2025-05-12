const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/user.model");
const { generateJWTToken } = require("../services/jwt.service");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

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
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    const token = generateJWTToken({
      id: userObj._id,
      email: userObj.email,
    });
    return res.status(StatusCodes.OK).json({ user: userObj, token: token });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
