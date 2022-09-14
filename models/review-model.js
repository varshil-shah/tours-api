const mongoose = require('mongoose');
const Tour = require('./tour-model');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: 'String',
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calculateAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.tour);
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
