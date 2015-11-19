var Player = require('../models/player');
var Score = require('../models/score');

var app = {};

app.findTopTenScores = function(gameId) {
  //mongo does sort and return top ten do that way
};

//player route methods
app.deletePlayer = function(playerId, callback) {
  Player.remove({ _id: playerId }, function(err) {
    if(err) return callback('Could not delete!');
    callback();
  });
};

app.getPlayer = function(playerId, callback) {
  Player.findById(playerId, function(err, player) {
    if(err) return callback('Could not get player!');
    callback(player);
  });
};

app.getGamesForPlayer = function(playerId, callback) {
  Score.find({ player: playerId })
    .populate('game')
    .exec(function(err, scores) {
      if(err) return callback('Could not get games!');
      var games = scores.map(function(score) { return score.game; });
      callback(games);
    });
};

module.exports = app;
