var Player = require('../models/player');
var Score = require('../models/score');
var User = require('../models/user');
var Game = require('../models/game');

var app = {};

//user route methods
app.createUser = function(username, website, callback) { //lets me do duplicates while it should't
  var user = new User();
  user.username = username;
  user.website = website;

  user.save(function(err, user) {
    if(err) return callback(err);
    return callback(null, user);
  });
};

app.deleteUser = function(userId, callback) { //lets me delete the same user multiple times
  User.remove({ _id: userId }, function(err) {
    if(err) return callback(err);
    return callback(null);
  });
  // User
  // .findOne({ _id: userId })
  // .exec(function(err, document) {
  //   if(err || !document) return callback(err);
  //   else {
  //     User.remove(document, function(err, user) {
  //       if(err) callback(err);
  //       callback(null, user);
  //     });
  //   }
  // });
};

app.getUser = function(userId, callback) {
  User.findById(userId, function(err, user) {
    if(err) return callback(err);
    if(!user) return callback('User not found.');
    return callback(null, user);
  });
};

app.updateUser = function(userId, username, website, callback) {
  User.findById(userId, function(err, user) {
    if(user.username == username && user.website == website) {
      return callback(err);
    }
    if(user.username != username) {
      user.username = username;
    }
    if(user.website != website) {
      user.website = website;
    }
    user.save(function(err, user) {
      if(err) return callback(err); //does not give any error when duplicate
      return callback(null, user);
    });
  });
};

//game route methods
app.createGame = function(name, website, userId, callback) {
  var game = new Game();
  game.name = name;
  game.website = website;
  game.user = userId;
  game.save(function(err, newGame) {
    if(err) return callback(err);
    return callback(null, newGame);
  });
};

app.deleteGame = function(gameId, callback) {
  Game.findById(gameId, function(err, game) {
    if(err || !game) return callback(err);
    else {
      Game.remove({ _id: gameId }, function(err) {
        if(err) return callback(err);
        return callback(null, 'Game deleted: ' + game);
      });
    }
  });
};

app.getGame = function(gameId, callback) {
  Game.findById(gameId, function(err, game) {
    if(err) return callback(err);
    if(!game) return callback('Game not found.');
    return callback(null, game);
  });
};

app.updateGame = function() {

};

app.getTopTenScores = function() {
  //mongo does sort and return top ten do that way
};

app.getScoreForGame = function() {

};

//Left testing right here, keep testing
//player route methods
app.createPlayer = function(name, username, password, email, callback) {
  var player = new Player();
  player.name = name;
  player.username = username;
  player.password = password;
  player.email = email;

  player.save(function(err) {
    if(err) return callback(err, null);
    return callback(null, player);
  });
};

//this is the right form, adapt other methods to this format
app.getPlayer = function(playerId, callback) {
  Player.findById(playerId, function(err, player) {
    if(err) return callback(err, null);
    if(!player) return callback('Player not found.');
    return callback(null, player);
  });
};

app.deletePlayer = function(playerId, callback) {
  Player.remove({ _id: playerId }, function(err, player) { //player burda (delete func'da) olur mu olmaz mi
    if(err) return callback(err);
    return callback(null, 'Player deleted: ' + player);
  });
};

app.getGamesOfPlayer = function(playerId, callback) {
  Score.find({ player: playerId })
    .populate('game')
    .exec(function(err, scores) {
      if(err) return callback(err);
      var games = scores.map(function(score) { return score.game; });
      return callback(null, games);
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
      if(err) return callback(err);
      return callback(null, player);
    });
  });
};

module.exports = app;
