const router = require('express').Router();
const thoughtControl = require('../../controllers/thought-control')
const {
  getAllthoughts,
  getThoughtId,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = thoughtControl;

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


module.exports = router;