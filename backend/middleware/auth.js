const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.harvestlink_token;

  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Your session has expired. Please log in again." });
  }
}

module.exports = { requireAuth };
