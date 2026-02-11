/**
 * Generic Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).send({
    status,
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err })
  });
};

module.exports = errorHandler;
