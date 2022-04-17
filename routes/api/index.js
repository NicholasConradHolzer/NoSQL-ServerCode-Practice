const router = require('express').Router();
const thoughtRoutes = require('./thought-rt');
const userRoutes = require('./user-rt');

router.use('/Thoughts', thoughtRoutes);
router.use('/Users', userRoutes);

module.exports = router;