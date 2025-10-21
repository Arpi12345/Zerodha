const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔐 Check for proper Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("Malformed or missing Authorization header");
    return res.status(401).json({ message: "Malformed or missing Authorization header" });
  }

  // ✅ Extract token
  const token = authHeader.split(" ")[1];
  console.log("Auth Header:", authHeader);
  console.log("Extracted token:", token);

  // 🔍 Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.warn("JWT expired at:", err.expiredAt);
        return res.status(401).json({
          message: "Token expired",
          expiredAt: err.expiredAt,
        });
      }

      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    // 🧠 Attach user info to request
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
