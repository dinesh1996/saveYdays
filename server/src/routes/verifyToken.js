const jwt = require("jsonwebtoken");
require('dotenv').config({
  path: process.env.DOTENV || '.env'
})
const fs = require('fs');
var path = require('path');

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  let token;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token)
    return res.status(403).send({
      auth: false,
      message: 'No token provided.'
    });

  // verifies secret and checks exp






  const publicKey = fs.readFileSync(path.resolve(__dirname, '../../.jwtRS256.key.pub'), 'utf8');
  jwt.verify(token, publicKey, {
    issuer: process.env.ISSUER,
    subject: process.env.SUBJECT,
    audience: process.env.AUDIENCE,
    expiresIn: process.env.EXPIRES_IN,
    algorithms: [process.env.ALGORITHM],

  }, (err, decoded) => {
    if (err)
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;