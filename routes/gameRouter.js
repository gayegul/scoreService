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
  .post(function(req, res) { //Let's you create the same thing over and over. PROBLEM! --> SOLVED!
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
    Game.findById(req.params.gameId, function(err, game) {
      if(game.name != req.body.name) game.name = req.body.name;
      if(game.website != req.body.website) game.website = req.body.website;

      game.save(function(err) {
        if(err) return res.send({ "error" : err });
        return res.send(game);
      });
    });
  });

router.route('/games/:game/scores')
  //returns the top ten scores
  .get(function(req, res) {
    Score.find({ game: req.params.game })
      .sort({ 'score': -1 })
      .limit(10)
      //.populate('game') appears as null? PROBABLY bc no nested population exists in mongoose
      .populate('player')
      .exec(function(err, scores) {
        if(err) res.send({ "error" : err });
        var topScores = scores.map(function(score) { return score.score; });
        var results = scores.map(function(score) { return score.score + ' : ' + score.player.username; });
        return res.send(results);
      });
  });

router.route('/games/:game/players/:player/score')
  //shows a player's score object for a specific game
  .get(function(req, res) {
    Score.findOne({ game: req.params.game, player: req.params.player }, function(err, score) {
      if(err) return res.send({ "error" : err });
      return res.send(score);
    });
  })
  //creates and saves a score for a particular player for a specific game
  .post(function(req, res) {
    var score = new Score();
    score.game = req.params.game;
    score.player = req.params.player;
    score.score = req.body.score;
    score.save(function(err) {
      if(err) return res.send({ "error" : err });
      return res.send(score);
    });
  });

module.exports = router;
