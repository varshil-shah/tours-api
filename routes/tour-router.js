const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  // checkId,
  // checkBody,
} = require('../controllers/tour-controller');

const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTour, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
