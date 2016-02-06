var express = require('express');
var router = express.Router();
var app = require('../lib/app');
var Game = require('../models/game');
var User = require('../models/user');
var Score = require('../models/score');

router.use(function(req, res, next) {
  // console.log('I am a middleware to auth soon.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

router.route('/games')
  //creates a new game
  .post(function(req, res) {
    app.createGame(req.body.name, req.body.website, req.body.user, function(err, game) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(game);
    });
  });

  router.route('/games/:gameName')
  //deletes the game
  .delete(function(req, res) {
    app.deleteGame(req.params.gameName, function(err, game) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send({ 'message': 'Game deleted.' });
    });
  })
  //returns the game object
  .get(function(req, res) {
    app.getGame(req.params.gameName, function(err, game) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(game);
    });
  })
  //updates the game info and returns it
  .put(function(req, res) {
    app.updateGame(req.params.gameName, req.body.name, req.body.website, function(err, game) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(game);
    });
  });

router.route('/games/:gameName/scores')
  //returns the top ten scores
  .get(function(req, res) {
    app.getTopTenScores(req.params.gameName, function(err, scores) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(scores);
    });
  });

router.route('/games/:gameName/players/:playerUsername/score')
  //shows a player's score object for a specific game
  .get(function(req, res) {
    app.getScore(req.params.gameName, req.params.playerUsername, function(err, score) {
      if(err) res.status(500).send({ 'error' : err });
      return res.send(score);
    });
  })
  //creates and saves a score for a particular player for a specific game
  .post(function(req, res) {
    app.createScore(req.params.gameName, req.params.playerUsername, req.body.score, function(err, score) {
      if(err) res.status(500).send({ 'error' : err });
      return res.send(score);
    });
  })
  //updates the score info and returns it
  .put(function(req, res) {
    app.updateScore(req.params.gameName, req.params.playerUsername, req.body.score, function(err, score) {
      if(err) res.status(500).send({ 'error' : err });
      return res.send(score);
    });
  });

module.exports = router;
