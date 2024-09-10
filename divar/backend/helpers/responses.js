// Helper function to format success responses
const successResponse = (res, statusCode = 200, data) => {
  res.status(statusCode).json({ status: statusCode, success: true, data });
};

// Helper function to format error responses
const errorResponse = (res, statusCode, message, data) => {
  console.error({ message, data }); // Log error details
  res
    .status(statusCode)
    .json({ status: statusCode, success: false, error: message, data });
};

module.exports = {
  successResponse,
  errorResponse,
};
