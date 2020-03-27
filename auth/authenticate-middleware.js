// require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	res.status(401).json({ you: "shall not pass!" });
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRETE || "thesecret",
			(err, decoded) => {
				if (err) {
					res.status(500).json({ message: "bad token" });
				} else {
					req.decodedToken = decoded;
					next();
				}
			}
		);
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};