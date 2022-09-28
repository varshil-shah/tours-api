const router = require('express').Router();
const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;