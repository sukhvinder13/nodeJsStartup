/**
 * Standardized Response Handler
 */

const successResponse = (status = 200, message = "Success", data = null) => ({
  status,
  success: true,
  message,
  ...(data && { data })
});

const errorResponse = (status = 500, message = "Error", error = null) => ({
  status,
  success: false,
  message,
  ...(error && process.env.NODE_ENV === "development" && { error })
});

module.exports = {
  successResponse,
  errorResponse
};
