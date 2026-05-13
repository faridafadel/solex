import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    const error = new Error("You must be logged in to do that. Please sign in or create an account.");
    error.statusCode = 401;
    throw error;
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.userId).select("-password");
    if (user) req.user = user;
  } catch {
    // token invalid — continue as guest
  }

  next();
});
