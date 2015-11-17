var Score = require('../models/score');
var express = require('express');
var router = express.Router();
var Player = require('../models/player');

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff!');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API!'});
});

router.route('/scores')
  .post(function(req, res) {
    Score.findOne({ player: req.body.player, game: req.body.game }, function(err, scoreObj) {
      if(err) return res.send(err);
      console.log(scoreObj);
      if(scoreObj) {
        if(req.body.score > scoreObj.score) {
          scoreObj.score = req.body.score;
          scoreObj.save(function(err) {
            if(err) return res.send(err);
            return res.send('Score updated and saved!');
          });
        } else {
          return res.send('Score ignored! Previous score: ' + scoreObj.score);
        }
      } else {
        var score = new Score();
        score.game = req.body.game;
        score.player = req.body.player;
        score.score = req.body.score;
        score.save(function(err) {
          if(err) return res.send(err);
          return res.send('Score updated and saved!');
        });
      }
    });
  })
  .get(function(req, res) {
    Score.find(function(err, scores) {
      if(err) return res.send(err);
      res.json(scores);
    });
  });

module.exports = router;
