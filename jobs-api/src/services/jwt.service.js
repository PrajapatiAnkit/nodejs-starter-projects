const jwt = require("jsonwebtoken");

const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
