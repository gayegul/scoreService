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
    var score = new Score();
    score.game = req.body.game;
    score.player = req.body.player;
    score.scores = req.body.scores;

    score.save(function(err) {
      if(err) {
        if(err.code == 11000) return res.send('Error!');
        else return res.send(err);
      }

      Player.findById({ player: req.body.player }, function(err, player) {
        score.scores.push(req.body.scores);
        res.send('Score created and saved!');
      });
    });
  })
  .get(function(req, res) {
    Score.find(function(err, scores) {
      if(err) return res.send(err);
      res.json(scores);
    });
  });

  router.route('/scores/:id')
  .delete(function(req, res) {
    Score.remove({ _id: req.params.id }, function(err) {
      if(err) return res.send(err);
      res.send('Score deleted!');
    });
  })

  // gets all scores for one player
  .get(function(req, res) {
    Score.find({ player: req.params.id }, function(err, scores) {
      if(err) return res.send(err);
      res.send(scores);
    });
  })
  .put(function(req, res) {
    Score.findById(req.params.id, function(err, score) {
      if(score.game != req.body.game) score.game = req.body.game;
      if(score.player != req.body.player) score.player = req.body.player;

      score.save(function(err) {
        if(err) return res.send(err);
        res.send(score);
      });
    });
  });

module.exports = router;
