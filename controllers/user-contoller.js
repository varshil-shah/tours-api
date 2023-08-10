const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const User = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const factory = require('./factory-controller');
const imageKit = require('../utils/image-kit');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/img/users');
//   },
//   filename: (req, file, callback) => {
//     const ext = file.mimetype.split('/')[1];
//     callback(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new AppError('Please provide a valid image!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  const filename = `user-${req.user.id}}.jpeg`;

  const imageBuffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 });
  // .toFile(`public/img/users/${req.file.filename}`);

  // Upload image to imagekit
  const uploadResponse = await imageKit.upload({
    file: imageBuffer,
    fileName: filename,
    folder: 'users',
  });

  console.log(uploadResponse);
  req.file.filename = uploadResponse.url;

  next();
});

const filterObject = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach((element) => {
    if (allowedFields.includes(element)) {
      newObject[element] = object[element];
    }
  });
  return newObject;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
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

  // Check if the user has uploaded the image
  if (req.file) {
    filteredBody.photo = req.file.filename;

    // Get old image name and delete it
    const user = await User.findById(req.user.id);
    // const oldImagePath = `public/img/users/${user.photo}`;
    // if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

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
