const router = require('express').Router({
  mergeParams: true,
});

const authController = require('../controllers/auth-controller');
const reviewController = require('../controllers/review-controller');

router.route('/:id').get(authController.protect, reviewController.getReview);

// POST tours/dh4hfn4w3jv/reviews
// GET tours/dh4hfn4w3jv/reviews
// POST /reviews

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
