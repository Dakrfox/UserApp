const jwt = require('jsonwebtoken');

// Middleware function to check if user is authenticated
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (token == null) return res.sendStatus(401); // Return 401 if no token is provided

  jwt.verify(token, 'miClaveSecreta', (err, user) => {
    if (err) return res.sendStatus(403); // Return 403 if token is invalid
    req.user = user; // Add user object to request for later use
    next(); // Call the next middleware function
  });
};

module.exports = authenticateUser;