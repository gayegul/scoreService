var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff!');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API!'});
});

router.route('/users')
  //creates a user
  .post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.website = req.body.website;

    user.save(function(err) {
      if(err) return res.send(err);
      return res.send('User created and saved!');
    });
  });

  router.route('/users/:userId')
  //deletes the specified user
  .delete(function(req, res) {
    User.remove({ _id: req.params.userId }, function(err) {
      if(err) return res.send(err);
      return res.send('User deleted!');
    });
  })
  //returns the user
  .get(function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if(err) return res.send(err);
      return res.send(user);
    });
  })
  //updates user info
  .put(function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if(user.username != req.body.username) {
        user.username = req.body.username;
      }
      if(user.website != req.body.website) {
        user.website = req.body.website;
      }
      if(user.game != req.body.game) {
        user.game = req.body.game;
      }
      user.save(function(err) {
        if(err) return res.send(err);
        return res.send(user);
      });
    });
  });

module.exports = router;
