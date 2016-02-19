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
  User.findOne({ 'username': username }, function(err, user) {
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
  User.findOne({ 'username': username }, function(err, user) {
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
    if(user.username !== newUsername) user.username = newUsername;
    if(user.website !== website) user.website = website;

    user.save(function(err, user) {
      if(err) return callback(err);
      return callback(null, user);
    });
  });
};

//GAME route methods
app.createGame = function(name, website, username, callback) {
  User.findOne({ username: username }, function(err, user) {
    if(err) return callback(err);
    var game = new Game();
    game.name = name;
    game.website = website;
    game.user = user._id;

    game.save(function(err, newGame) {
      if(err) return callback(err);
      //instead of returning id of user, return username in the game object
      //toObject returns a copy so you can modify
      newGame = newGame.toObject();
      newGame.user = user.toObject();
      return callback(null, newGame);
    });
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
    else if(!game) return callback('Game not found.');
    return callback(null, game);
  });
};

app.updateGame = function(gameName, name, website, callback) {
  Game.findOne({ name: gameName }, function(err, game) {
    if(err) return callback(err);
    else if(!game) return callback('Game not found.');
    else if(game.name === gameName && game.website === website) return callback('Not updated info.');
    else if(game.name !== gameName) game.name = gameName;
    else if(game.website !== website) game.website = website;
    else {
      game.name = gameName;
      game.website = website;
    }

    game.save(function(err) {
      if(err) return callback(err);
      return callback(null, game);
    });
  });
};

app.getTopTenScores = function(gameName, callback) {
  app.getGame(gameName, function(err, game) {
    if(err) return callback(err);
    Score.find({ game: game._id })
    .sort({ 'score': -1 })
    .limit(10)
    .populate('player')
    .exec(function(err, scores) {
      if(err) return callback(err);
      var results = [];
      for(var i = 0; i < scores.length; i++) {
        results.push({
          'username' : scores[i].player.username,
          'score' : scores[i].score
        });
      }
      return callback(null, results);
    });
  });
};

// app.getTopTenScores = function(gameName, callback) {
//   Score.find({ game: gameName })
//     .sort({ 'score': -1 })
//     .limit(10)
//     .populate('player')
//     .exec(function(err, scores) {
//       console.log(err);
//       if(err) return callback(err);
//       var topScores = scores.map(function(score) { return score.score; });
//       var results = scores.map(function(score) { return score.player.username + ' : ' + score.score; });
//       return callback(null, results);
//     });
// };

app.getScore = function(gameName, playerUsername, callback) {
  app.getGame(gameName, function(err, game) {
    if(err) return callback(err);
    app.getPlayer(playerUsername, function(err, player) {
      if(err) return callback(err);
      Score.findOne({ game: game._id, player: player._id }, function(err, score) {
        if(err) return callback(err);
        return callback(null, score);
      });
    });
  });
};

app.createScore = function(gameName, playerUsername, newScore, callback) {
  app.getGame(gameName, function(err, game) {
    if(err) return callback(err);
    app.getPlayer(playerUsername, function(err, player) {
      if(err) return callback(err);
      var score = new Score();
      score.game = game._id;
      score.player = player._id;
      score.score = newScore;

      score.save(function(err, score) {
        if(err) return callback(err);
        return callback(null, score);
      });
    });
  });
};

//updates the score only when the new score is higher than the old one
app.updateScore = function(gameName, playerUsername, newScore, callback) {
  app.getGame(gameName, function(err, game) {
    if(err) return callback(err);
    app.getPlayer(playerUsername, function(err, player) {
      if(err) return callback(err);
      Score.findOne({ game: game._id, player: player._id }, function(err, score) {
        if(err) return callback(err);
        else if(!score) return callback('No previous score.');
        else if(score.score === newScore) return callback('Not updated info.');
        else if(newScore > score.score) score.score = newScore;

        score.save(function(err) {
          if(err) return callback(err);
          return callback(null, score);
        });
      });
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
  Player.findOne({ 'username': username }, function(err, player) {
    if(err) return callback(err, null);
    else if(!player) return callback('Player not found.');
    return callback(null, player);
  });
};

app.deletePlayer = function(username, callback) {
  Player.findOne({ 'username': username }, function(err, player) {
    if(err) return callback(err);
    else if(!player) return callback('Player not found.');
    player.remove(function(err) {
      if(err) return callback(err);
      return callback(null, 'Player deleted.');
    });
  });
};

app.updatePlayer = function(username, newName, newUsername, callback) {
  Player.findOne({'username': username }, function(err, player) {
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

app.getGamesOfPlayer = function(playerUsername, callback) {
  app.getPlayer(playerUsername, function(err, player) {
    if(err) return callback(err);
    Score.find({ player: player._id })
      .populate('game')
      .exec(function(err, scores) {
        if(err) return callback(err);
        else if(!scores) return callback(err);
        var result = scores.map(function(score) {
          return score.game;
        });
        return callback(null, result);
      });
  });
};

module.exports = app;
