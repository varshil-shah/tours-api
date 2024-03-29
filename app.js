const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');

const tourRouter = require('./routes/tour-router');
const userRouter = require('./routes/user-router');
const reviewRouter = require('./routes/review-router');
const viewRouter = require('./routes/view-router');
const bookingRouter = require('./routes/booking-router');

const bookingController = require('./controllers/booking-controller');

const app = express();

// serving views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set secure http headers
// app.use(helmet());

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// backend(api.website.com) frontend(website.com)
// app.use(
//   cors({
//     origin: 'https://website.com',
//   })
// );

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
      'difficulty',
      'maxGroupSize',
    ],
  })
);

app.use(compression());

// limit request from same API
const limiter = rateLimiter({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour',
});

app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

// cookie parser
app.use(cookieParser());

// body parser, reading data from body into req.body
// limiting amount of data comes in the body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// data sanitization again NOSQL query injection
app.use(mongoSanitize());

// data sanitization again cross-site scripting attacks (XSS)
app.use(xss());

// development logging
if (process.env.NODE_ENV === 'development') {
  const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), {
    flags: 'a',
  });
  app.use(morgan('dev'));
  app.use(morgan('combined', { stream: logStream }));
}

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERRROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
