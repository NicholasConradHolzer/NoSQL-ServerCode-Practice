const router = require('express').Router();
const apiRoutes = require('./api');
router.use('/api', apiRoutes);
router.use((req, res) => {
  return res.send('wrong route')
  // res.status(404).json({message: '404 Error!(index level)'});
});



module.exports = router;