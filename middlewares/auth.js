const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  // Get token from the headers
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied" });
  }
  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = protectRoute;
