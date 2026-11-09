const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.harvestlink_token;

  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}

module.exports = { requireAuth };
