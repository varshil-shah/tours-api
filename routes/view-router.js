const router = require('express').Router();
const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginPage);

module.exports = router;
