const { verifyJWTToken } = require("../services/jwt.service");

const authMiddleware = (req, res, next) => {
  const headers = req.headers;
  let authorization = headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.json({ error: "Missing authorization" });
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = verifyJWTToken(token);
    req.authUser = { userId: payload.id, email: payload.email };
    next();
  } catch (error) {
    console.log("authMiddleware", error);
    return res.json({ error: error.message });
  }
};

module.exports = authMiddleware;
