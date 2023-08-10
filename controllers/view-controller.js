const Tour = require('../models/tour-model');
const Booking = require('../models/booking-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

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
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    title: 'Login into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = async (req, res) => {
  const booking = await Booking.find({ user: req.user.id });
  const tourIds = booking.map((element) => element.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });
  console.log(tourIds.length);

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
};
