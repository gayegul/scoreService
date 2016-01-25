var Player = require('../models/player');
var Score = require('../models/score');
var User = require('../models/user');
var Game = require('../models/game');

var app = {};

//USER route methods
//creates a new user
app.createUser = function(username, website, callback) {
  var user = new User();
  user.username = username;
  user.website = website;
  user.save(function(err, user) {
    if(err) return callback(err);
    return callback(null, user);
  });
};

//given a username, deletes the user
app.deleteUser = function(username, callback) {
  User.findOne(username, function(err, user) {
    if(err) return callback(err);
    if(!user) return callback('User not found.');
    user.remove(function(err) {
      if(err) return callback(err);
      return callback(null);
    });
  });
};

//given a username, returns the user object
app.getUser = function(username, callback) {
  User.findOne(username, function(err, user) {
    if(err) return callback(err);
    if(!user) return callback('User not found.');
    return callback(null, user);
  });
};

//given a username, updates the user object
app.updateUser = function(username, newUsername, website, callback) {
  User.findOne({ username: username }, function(err, user) {
    if(err) return callback(err);
    if(user.username === newUsername && user.website === website) {
      return callback('Not new info.', user);
    }
    if(user.username !== newUsername) {
      user.username = newUsername;
    }
    if(user.website !== website) {
      user.website = website;
    }
    user.save(function(err, user) {
      if(err) return callback(err);
      return callback(null, user);
    });
  });
};

//GAME route methods
app.createGame = function(name, website, username, callback) {
  var game = new Game();
  game.name = name;
  game.website = website;
  game.user = username;

  game.save(function(err, newGame) {
    if(err) return callback(err);
    return callback(null, newGame);
  });
};

app.deleteGame = function(gameName, callback) {
  Game.findOneAndRemove({ name: gameName }, function(err, game) {
    if(err) return callback(err);
    else if(!game) return callback('Game not found.');
    return callback(null, game);
  });
};

app.getGame = function(gameName, callback) {
  Game.findOne({ name: gameName }, function(err, game) {
    if(err) return callback(err);
    if(!game) return callback('Game not found.');
    return callback(null, game);
  });
};

app.updateGame = function(gameName, name, website, callback) {
  Game.findOne({ name: gameName }, function(err, game) {
    if(err) return callback(err);
    if(!game) return callback('Game not found.');
    if(game.name === gameName && game.website === website) return callback('Not updated info.');
    if(game.name != gameName) game.name = gameName;
    if(game.website != website) game.website = website;

    game.save(function(err) {
      if(err) return callback(err);
      return callback(null, game);
    });
  });
};

app.getTopTenScores = function(gameName, callback) {
  Score.find({ game: gameName })
    .sort({ 'score': -1 })
    .limit(10)
    .populate('player')
    .exec(function(err, scores) {
      if(err) return callback(err);
      var topScores = scores.map(function(score) { return score.score; });
      var results = scores.map(function(score) { return score.player.username + ' : ' + score.score; });
      return callback(null, results);
    });
};

app.getScore = function(gameName, playerUsername, callback) {
  Score.findOne({ game: gameName, player: playerUsername }, function(err, score) {
    if(err) return callback(err);
    return callback(null, score);
  });
};

app.createScore = function(gameName, playerUsername, newScore, callback) {
  var score = new Score();
  score.game = gameName;
  score.player = playerUsername;
  score.score = newScore;

  score.save(function(err, score) {
    if(err) return callback(err);
    return callback(null, score);
  });
};

//updates the score only when the new score is higher than the old one
app.updateScore = function(gameName, playerUsername, newScore, callback) {
  Score.findOne({ game: gameName, player: playerUsername }, function(err, score) {
    if(err) return callback(err);
    else if(!score) return callback('No previous score.');
    else if(score.score === newScore) return callback('Not updated info.');
    else if(newScore > score.score) {
      score.score = newScore;
    }
    score.save(function(err) {
      if(err) return callback(err);
      return callback(null, score);
    });
  });
};

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

app.getPlayer = function(username, callback) {
  Player.findOne(username, function(err, player) {
    if(err) return callback(err, null);
    if(!player) return callback('Player not found.');
    return callback(null, player);
  });
};

app.deletePlayer = function(username, callback) {
  Player.remove({ username: username }, function(err, player) {
    if(err) return callback(err);
    return callback(null, 'Player deleted.');
  });
};

app.updatePlayer = function(username, newName, newUsername, callback) {
  Player.findOne(username, function(err, player) {
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

app.getGamesOfPlayer = function(playerId, callback) {
  Score.find({ player: playerId })
    .populate('game')
    .exec(function(err, scores) {
      if(err) return callback(err);
      var games = scores.map(function(score) { return score.game; });
      return callback(null, games);
    });
};

module.exports = app;
