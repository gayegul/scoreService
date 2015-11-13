var Player = require('../models/player');
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff!');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API!'});
});

router.route('/players')
  .post(function(req, res) {
    var player = new Player();
    player.name = req.body.name;
    player.username = req.body.username;
    player.password = req.body.password;
    player.email = req.body.email;

    player.save(function(err) {
      if(err) {
        if(err.code == 11000) return res.send('Player already exists!');
        else return res.send(err);
      }
      res.send('Player created!');
    });
  })
  .get(function(req, res) {
    Player.find(function(err, players) {
      if(err) return res.send(err);
      res.json(players);
    });
  });

  router.route('/players/:id')
  .delete(function(req, res) {
    Player.remove({
      _id: req.params.id
    }, function(err) {
      if(err) return res.send(err);
      res.send('Player deleted!');
    });
  })
  .get(function(req, res) {
    Player.findById(req.params.id, function(err, player) {
      if(err) return res.send(err);
      res.send(player);
    });
  })
  .put(function(req, res) {
    Player.findById(req.params.id, function(err, player) {
      if(player.name != req.body.name) player.name = req.body.name;
      if(player.username != req.body.username) player.username = req.body.username;

      player.save(function(err) {
        if(err) return res.send(err);
        res.send(player);
      });
    });
  });

module.exports = router;
