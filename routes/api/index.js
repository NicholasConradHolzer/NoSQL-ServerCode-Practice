const router = require('express').Router();
const userRoutes = require('./user-rt');
const thoughtRoutes = require('./thought-rt');

router.use('/users', userRoutes);
// console.log(userRoutes);
router.use('/thoughts', thoughtRoutes);
// console.log(thoughtRoutes);

module.exports = router;