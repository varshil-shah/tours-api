const router = require('express').Router({
  mergeParams: true,
});

const authController = require('../controllers/auth-controller');
const reviewController = require('../controllers/review-controller');

router.use(authController.protect);

router.route('/:id').get(reviewController.getReview);

// POST tours/dh4hfn4w3jv/reviews
// GET tours/dh4hfn4w3jv/reviews
// POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
