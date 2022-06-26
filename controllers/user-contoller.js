const User = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const factory = require('./factory-controller');

const filterObject = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach((element) => {
    if (!allowedFields.includes(element)) {
      newObject[element] = object[element];
    }
  });
  return newObject;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // If req.body contains password or passwordConfirm, send error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route if not for updating password.\nPlease use /update-my-password.',
        400
      )
    );
  }

  // filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email');

  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // If everything is ok, send success
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
