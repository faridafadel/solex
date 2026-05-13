import { env } from "../config/env.js";

export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong.";

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format.";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors || {})
      .map((e) => e.message)
      .join(", ");
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    message,
    ...(env.nodeEnv !== "production" && { stack: error.stack }),
  });
};
