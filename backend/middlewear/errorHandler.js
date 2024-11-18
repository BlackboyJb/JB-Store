const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const handleError = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "Production" ? "&#128077" : err.stack,
  });
};

export { notFound, handleError };
