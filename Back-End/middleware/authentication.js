const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_TOKEN = process.env.JWT_TOKEN;

const authentication = (req, res, next) => {
  try {
    const authen = req.headers.authorization;

    if (!authen || !authen.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization, No token Provided." });
    }

    const token = authen.split(" ")[1];
    const decode = jwt.verify(token, JWT_TOKEN);

    req.user = {
      id: decode.userId,
      username: decode.username,
    };

    next(); // ✅ Let the request continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authentication;
