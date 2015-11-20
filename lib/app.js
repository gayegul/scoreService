var Player = require('../models/player');
var Score = require('../models/score');

var app = {};

app.findTopTenScores = function(gameId) {
  //mongo does sort and return top ten do that way
};

//user route methods

//game route methods

//player route methods

app.createPlayer = function(name, username, password, email, callback) {
  var player = new Player();
  player.name = name;
  player.username = username;
  player.password = password;
  player.email = email;

  player.save(function(err) {
    if(err) return callback('Could not create player!');
    callback(player);
  });
};

app.getPlayer = function(playerId, callback) {
  Player.findById(playerId, function(err, player) {
    if(err) return callback('Could not get player!');
    callback(player);
  });
};

app.deletePlayer = function(playerId, callback) {
  Player.remove({ _id: playerId }, function(err) {
    if(err) return callback('Could not delete!');
    callback();
  });
};

app.getGamesOfPlayer = function(playerId, callback) {
  Score.find({ player: playerId })
    .populate('game')
    .exec(function(err, scores) {
      if(err) return callback('Could not get games!');
      var games = scores.map(function(score) { return score.game; });
      callback(games);
    });
};

app.updatePlayer = function(playerId, newName, newUsername, callback) {
  Player.findById(playerId, function(err, player) {
    if(player.name != newName) {
      player.name = newName;
    }
    if(player.username != newUsername) {
      player.username = newUsername;
    }
    player.save(function(err) {
      if(err) return callback('Could not update player!');
      callback(player);
    });
  });
};


module.exports = app;
