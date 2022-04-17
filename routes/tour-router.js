const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
} = require('../controllers/tour-controller');

const router = express.Router();

// router.param('id', checkId);

router.route('/stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopTour, getAllTours);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
router.route('/').get(getAllTours).post(createTour);

module.exports = router;
