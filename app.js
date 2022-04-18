const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tour-router');
const userRouter = require('./routes/user-router');

const app = express();

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
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
