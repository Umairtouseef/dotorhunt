const successResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
