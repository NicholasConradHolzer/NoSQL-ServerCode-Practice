const router = require('express').Router();
const {
  getAllUsers,
  getUserId,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  removeFriend
} = require('../../controllers/user-control');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUsers)

// /api/users/:id
router.route('/:userId')
  .get(getUserId)
  .put(updateUsers)
  .delete(deleteUsers);
// /api/users/:id/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;