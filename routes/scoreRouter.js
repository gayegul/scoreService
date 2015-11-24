var Score = require('../models/score');
var express = require('express');
var router = express.Router();
var Player = require('../models/player');

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

module.exports = router;
