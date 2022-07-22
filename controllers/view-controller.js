const Tour = require('../models/tour-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find({});

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const tour = await Tour.findOne({ slug: slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    next(AppError('No tour found with this name', 400));
  }

  res.status(200).render('tour', {
    title: 'The Forest Hikers Tour',
    tour,
  });
});
