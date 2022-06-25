const express = require('express');
const tourController = require('../controllers/tour-controller');
const authController = require('../controllers/auth-controller');
const reviewController = require('../controllers/review-controller');

const router = express.Router();

// router.param('id', checkId);

router.route('/stats').get(tourController.getTourStats);
router
  .route('/top-5-cheap')
  .get(
    authController.protect,
    tourController.aliasTopTour,
    tourController.getAllTours
  );

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/:id')
  .get(authController.protect, tourController.getTour)
  .patch(authController.protect, tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(authController.protect, tourController.createTour);

// POST tours/dh4hfn4w3jv/reviews
// GET tours/konefojekvk/reviews
// GET tour/konefojekvk/reviews/dfijevinief

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
