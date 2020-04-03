const jwt = require("jsonwebtoken");

/**
 *  Check if user-request with x-auth-token header is authorized to preform some action, it add user info to request as req.user
 */
let auth = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) 
    return res.status(401).send({status: 401, message: "Access Denied. No token provided"});
  try {
    const decoded = jwt.verify(token,"jwtPrivateKey");
    req.user = decoded;  
    next();
  } 
  catch (ex) { 
    res.status(400).send({status: 400, message: "Invalid Token."});
  }
  
};
module.exports = auth;