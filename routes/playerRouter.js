var express = require('express');
var router = express.Router();
var app = require('../lib/app');
var Player = require('../models/player');
var Game = require('../models/game');
var Score = require('../models/score');

router.use(function(req, res, next) {
  // console.log('I am a middleware to auth and stuff.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

router.route('/players')
  //creates and saves a new player
  .post(function(req, res) {
    app.createPlayer(req.body.name, req.body.username, req.body.password, req.body.email, function(err, player) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(player);
    });
  });

router.route('/players/:username')
  //returns the specified player object
  .get(function(req, res) {
    app.getPlayer(req.params.username, function(err, player) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(player);
    });
  })
  //deletes the specified player
  .delete(function(req, res) {
    app.deletePlayer(req.params.username, function(err) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send({ 'message': 'Player deleted.' });
    });
  })
  //updates player information
  .put(function(req, res) {
    app.updatePlayer(req.params.username, req.body.name, req.body.username, function(err, player) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(player);
    });
  });

router.route('/players/:player/games')
  //returns games (game objects) that are played by the player
  .get(function(req, res) {
    app.getGamesOfPlayer(req.params.player, function(err, games) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(games);
    });
  });

module.exports = router;
