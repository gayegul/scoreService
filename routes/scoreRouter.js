var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  // console.log('I am a middleware to auth soon.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

module.exports = router;
