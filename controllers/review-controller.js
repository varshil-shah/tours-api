const Review = require('../models/review-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

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

exports.createReview = catchAsync(async (req, res) => {
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
