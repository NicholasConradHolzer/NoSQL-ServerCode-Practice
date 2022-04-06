const router = require('express').Router();
const userRoutes = require('./users.js');
const thoughtRoutes = require('./thoughts.js');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;