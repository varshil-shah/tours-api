const express = require('express');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-contoller');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').patch(authController.resetPassword);

router.use(authController.protect);

router.route('/update-my-password').patch(authController.updatePassword);

router.route('/me').get(userController.getMe, userController.getUser);

router.route('/update-me').patch(userController.updateMe);

router.route('/delete-me').delete(userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
