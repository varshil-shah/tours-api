const User = require('../models/user-model');
const catchAsync = require('../utils/catch-async');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
