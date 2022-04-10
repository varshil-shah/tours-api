const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('./../controllers/user-contoller');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
