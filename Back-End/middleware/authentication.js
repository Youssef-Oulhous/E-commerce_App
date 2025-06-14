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
    console.log('Authorization header:', req.headers.authorization)

    req.user = {
      id: decode.userId,
      username: decode.username,
    };

    next(); 
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
    
  }
};

module.exports = authentication;
