const router = require('express').Router();

const adminRouter = require('./admin');

router.get('/ping', function(req, res){
  res.send('pong');
});

router.use('/admin', adminRouter);

module.exports = router;