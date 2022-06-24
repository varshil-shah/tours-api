const router = require('express').Router();

const authController = require('../controllers/auth-controller');
const reviewController = require('../controllers/review-controller');

router.route('/:id').get(authController.protect, reviewController.getReview);

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
