const express = require('express');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-contoller');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router
  .route('/update-my-password')
  .patch(authController.protect, authController.updatePassword);

router
  .route('/update-me')
  .patch(authController.protect, userController.updateMe);

router
  .route('/delete-me')
  .delete(authController.protect, userController.deleteMe);

router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').patch(authController.resetPassword);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
