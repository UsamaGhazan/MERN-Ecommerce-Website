// Custom Not Found error for false URL
const notFound = (req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error); //passed to next middleware (custom error handler)
};

//custom error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //kabi kabi error ho b to 200 status code bhej deta hy express ... us sy bachny k leye ye kea
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, //production mein stack wala message ni nazar ayega
  });
};

export { notFound, errorHandler };
