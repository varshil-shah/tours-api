const url = require('url');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const APIFeatures = require('../utils/api-features');
const redisClient = require('../utils/redis-cache');

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const data = await redisClient.get(req.params.id);

    if (data) {
      return res.status(200).json({
        status: 'success',
        data: {
          data: JSON.parse(data),
        },
      });
    }

    const document = await query;
    if (!document) {
      return next(new AppError('No document found with that Id', 404));
    }

    redisClient.set(
      req.params.id,
      JSON.stringify(document),
      'EX',
      process.env.REDIS_CACHE_EXPIRE
    );

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    if (!Object.keys(filter).length) {
      const data = await redisClient.get(JSON.stringify(req.originalUrl));

      if (data) {
        const finalData = JSON.parse(data);

        return res.status(200).json({
          status: 'success',
          results: finalData.length,
          data: {
            data: finalData,
          },
        });
      }
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fieldLimit()
      .pagination();
    const document = await features.query;

    redisClient.set(
      JSON.stringify(req.originalUrl),
      JSON.stringify(document),
      'EX',
      process.env.REDIS_CACHE_EXPIRE
    );

    res.status(200).json({
      status: 'success',
      results: document.length,
      data: {
        data: document,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with that Id', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError(`No document found with that Id`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });
