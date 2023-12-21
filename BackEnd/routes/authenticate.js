// authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    // Example: Check if the Authorization header contains a valid JWT token
    const token = req.cookies.token; // Change 'token' to the name of your cookie

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, 'your-secret-key'); // Change this to a secure secret

    // Your other authentication logic...

    // Attach user information to the request for use in route handlers
    req.user = decoded;

    next(); // If authenticated, proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { authenticateUser };
