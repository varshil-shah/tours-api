const sendErrorDevelopment = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
  });
};

const sendErrorProduction = (error, res) => {
  // OPERATIONAL, TRUSTED ERRROR - SEND MESSAGE TO CLIENT
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

    // PROGRAMMING ERRROR OR OTHER UNKNOWN ERRROR - DON'T LEAK
  } else {
    // eslint-disable-next-line no-console
    console.error(`ERRROR 💣 ${error}`);

    // SEND GENERIC RESPONSE
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong :(',
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProduction(error, res);
  }
  next();
};
