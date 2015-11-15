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
  .post(function(req, res) {
    var user = new User();
    user.website = req.body.website;
    // user.date = req.body.date;

    user.save(function(err) {
      if(err) {
        if(err.code == 11000) return res.send('User already exists!');
        else return res.send(err);
      }
      res.send('User created!');
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) return res.send(err);
      res.json(users);
    });
  });

  router.route('/users/:id')
  .delete(function(req, res) {
    User.remove({
      _id: req.params.id
    }, function(err) {
      if(err) return res.send(err);
      res.send('User deleted!');
    });
  })
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) return res.send(err);
      res.send(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(user.game != req.body.game) user.game = req.body.game;
      if(user.website != req.body.website) user.website = req.body.website;

      user.save(function(err) {
        if(err) return res.send(err);
        res.send(user);
      });
    });
  });

module.exports = router;
