var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var User = require('../models/user');
var Score = require('../models/score');

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff!');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API!'});
});

router.route('/games')
  .post(function(req, res) {
    var game = new Game();
    game.name = req.body.name;
    game.website = req.body.website;
    game.user = req.body.userId;

    game.save(function(err, game) {
      if(err) {
        if(err.code == 11000) return res.send('Error');
        else return res.send(err);
      }
      User.findById(game.user, function(err, user) {
        user.games.push(game._id);
        user.save(function(err, user) {
          if(err) return res.status(500).send(err);
          res.send('Game created!');
        });
      });
    });
  });

  router.route('/games/:id')
  .delete(function(req, res) {
    Game.remove({ _id: req.params.id }, function(err) {
      if(err) return res.send(err);
      res.send('Game deleted!');
    });
  })
  .get(function(req, res) {
    Game.findById(req.params.id, function(err, game) {
      if(err) return res.send(err);
      res.send(game);
    });
  })
  .put(function(req, res) {
    Game.findById(req.params.id, function(err, game) {
      if(game.name != req.body.name) game.name = req.body.name;
      if(game.website != req.body.website) game.website = req.body.website;
      game.save(function(err) {
        if(err) return res.send(err);
        res.send(game);
      });
    });
  });

  router.route('/games/:game/scores')
  .get(function(req, res) {
    Score.find({ game: req.params.game }, function(err, scores) {
      res.send(scores.scores);
    });
  });

module.exports = router;
