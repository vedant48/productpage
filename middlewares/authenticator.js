const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');


exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token', token);
  if (!token) {
    return res.status(401).json({
      message: 'You are not authorized to access this resource'
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'You are not authorized to access this resource'
    });
  }

}

