require('dotenv').config();
const jwt = require("jsonwebtoken");

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const secret = process.env.JWT_SECRET || "A secret lives here";
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, secret, (error, decodedToken) => {
          if (error) {
              res.status(401).json({ message: "Something went wrong:- " + error.message})
          } else {
              req.user = decodedToken.user
              next()
          }
      })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};