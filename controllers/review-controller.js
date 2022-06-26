const Review = require('../models/review-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const Tour = require('../models/tour-model');
const factory = require('./factory-controller');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('No review found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { review },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const tour = await Tour.findById(req.body.tour);
  if (!tour) {
    return next(new AppError('No tour found with that Id', 404));
  }

  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour,
    user: req.body.user,
  });

  res.status(201).json({
    status: 'success',
    data: { review },
  });
});

exports.deleteReview = factory.deleteOne(Review);
