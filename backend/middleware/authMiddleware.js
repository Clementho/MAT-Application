require('dotenv').config();

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const secret = process.env.AUTH_SECRET_KEY;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied, token missing or invalid" });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      return res.status(403).json({ message: `Token verification failed, Secret: ${secret} Error: ${error}` });
    }
  }
};

const authenticateAdminToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const secret = process.env.AUTH_SECRET_KEY;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Access denied, token missing or invalid" });
  }

  const token = authHeader.slice(7);

  try {
    console.log("Received Token:", token);

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied, admin privilege required" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      return res.status(403).json({ message: `Token verification failed, Secret: ${secret} Error: ${error}` });
    }
  }
};

module.exports = { authenticateToken, authenticateAdminToken };
