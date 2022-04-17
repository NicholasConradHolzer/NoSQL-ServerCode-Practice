const router = require('express').Router();
const apiRoutes = require('./api');
router.use((req, res) => {
  res.status(404).json({message: '404 Error!(index level)'});
});
router.use('/api', apiRoutes);



module.exports = router;