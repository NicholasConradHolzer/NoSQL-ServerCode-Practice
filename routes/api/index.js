const router = require('express').Router();
const thoughtRoutes = require('./thought-rt');
const userRoutes = require('./user-rt');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
// console.log(userRoutes);
// console.log(thoughtRoutes);

module.exports = router;