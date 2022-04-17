const router = require('express').Router();
const {
  getAllthoughts,
  getThoughtId,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-control');

// /api/thoughts
router.route('/')
  .get(getAllthoughts)
  .post(addThought)

router.route('/:thoughtId')
  .get(getThoughtId)
  .put(updateThought)
  .delete(removeThought)

router.route('/:thoughtId/reactions')
  .post(addReaction)
  
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

// /api/thoughts/:id

module.exports = router;