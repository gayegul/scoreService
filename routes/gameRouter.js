var express = require('express');
var router = express.Router();
var app = require('../lib/app');
var Game = require('../models/game');
var User = require('../models/user');
var Score = require('../models/score');

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

router.route('/games')
  //creates a new game
  .post(function(req, res) {
    app.createGame(req.body.name, req.body.website, req.body.userId, function(err, game) {
      if(err) return res.send({ "error" : err });
      return res.send(game);
    });
  });

  router.route('/games/:gameId')
  //deletes the game
  .delete(function(req, res) {
    app.deleteGame(req.params.gameId, function(err, game) {
      if(err) return res.send({ "error" : err });
      return res.send(game);
    });
  })

  //returns the game object
  .get(function(req, res) {
    app.getGame(req.params.gameId, function(err, game) {
      if(err) return res.send({ "error" : err });
      return res.send(game);
    });
  })
  //updates the game info and returns it
  .put(function(req, res) {
    app.updateGame(req.params.gameId, req.body.name, req.body.website, function(err, game) {
      if(err) return res.send({ "error" : err });
      return res.send(game);
    });
  });

router.route('/games/:game/scores')
  //returns the top ten scores
  .get(function(req, res) {
    app.getTopTenScores(req.params.game, function(err, scores) {
      if(err) return res.send({ "error" : err });
      return res.send(scores);
    });
  });

router.route('/games/:game/players/:player/score')
  //shows a player's score object for a specific game
  .get(function(req, res) {
    app.getScore(req.params.game, req.params.player, function(err, score) {
      if(err) res.send({ "error" : err });
      return res.send(score);
    });
  })
  //creates and saves a score for a particular player for a specific game
  .post(function(req, res) {
    app.createScore(req.params.game, req.params.player, req.body.score, function(err, score) {
      if(err) res.send({ "error" : err });
      return res.send(score);
    });
  })
  //updates the score info and returns it
  .put(function(req, res) {
    app.updateScore(req.params.game, req.params.player, req.body.score, function(err, score) {
      if(err) return res.send({ "error" : err });
      return res.send(score);
    });
  });

module.exports = router;
