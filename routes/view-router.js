const router = require('express').Router();
const viewController = require('../controllers/view-controller');

router.get('/', viewController.getOverview);

router.get('/tour/:slug', viewController.getTour);

module.exports = router;
