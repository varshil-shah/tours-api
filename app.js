const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tour-router');
const userRouter = require('./routes/user-router');

const app = express();

// 3rd party middleware -
app.use(express.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
