const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/user-model');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  const token = signToken(user._id);

  res.cookie('jwt', token, cookieOptions);

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    active: req.body.active,
  });

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  // Check if the user exists and password is correct
  const user = await User.findOne({ email }).select('password');

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(
      new AppError(`Email doesn't exists or password is incorrect`, 401)
    );
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if the token is present
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401)
    );
  }

  // verification of the token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user still exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError(`The user belonging to this token no longer exists`, 401)
    );
  }

  // check if the user has changed his/her password
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError(
        `User recently changed password, please login to continue!`,
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You do not have permission to perform this action!`, 403)
      );
    }
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user from provided email address
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There is not user with this email address`, 404));
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send it to user's email address
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const text = `Forgot your password? Submit a PATCH request with your new password and confirm password to: ${resetURL}.\nIf you didn't forgot your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      text: text,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token send to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error while sending an email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha512')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token is not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has been expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update the changedPasswordAt property of the user
  // 4) Log the user in and send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // check if currentPassword, password and confirmPassword are present
  const { passwordCurrent, password, passwordConfirm } = req.body;
  if (!passwordCurrent || !password || !passwordConfirm) {
    return next(
      new AppError(
        'Please provide current password, password and confirm password to proceed!',
        401
      )
    );
  }

  // get user from the collection
  const user = await User.findById({ _id: req.user.id }).select('+password');

  // check if the POSTed password is correct
  if (!(await user.verifyPassword(passwordCurrent, user.password))) {
    return next(new AppError(`Your current password is incorrect!`, 401));
  }

  // If so, update the password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate() will not work as intended!

  // Log user in, send JWT
  createSendToken(user, 200, res);
});
