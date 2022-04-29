const express = require('express');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');

const tourRouter = require('./routes/tour-router');
const userRouter = require('./routes/user-router');

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour',
});

app.use('/api', limiter);

// 3rd party middleware -
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERRROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
