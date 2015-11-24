var express = require('express');
var router = express.Router();
var app = require('../lib/app');
var User = require('../models/user');

router.use(function(req, res, next) {
  console.log('I am a middleware to auth and stuff.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

router.route('/users')
  //creates a user
  .post(function(req, res) {
    app.createUser(req.body.username, req.body.website, function(err, user) {
      if(err) return res.send({ "error" : err });
      return res.send(user);
    });
  });

router.route('/users/:userId')
  //deletes the specified user
  .delete(function(req, res) {
    app.deleteUser(req.params.userId, function(err) {
      if(err) return res.send({ "error" : err });
      return res.send('User deleted.');
    });
  })
  //returns the user
  //DONT USE _ID AS A UNIQUE COLUMN IN TABLES WHERE THERE IS ANOTHER UNIQUE COLUMN, USE UNIQUE C. INSTEAD
  //use findone to find instead of findbyid
  .get(function(req, res) {
    app.getUser(req.params.userId, function(err, user) {
      if(err) return res.send({ "error" : err });
      return res.send(user);
    });
  })
  //updates user info
  .put(function(req, res) {
    app.updateUser(req.params.userId, req.body.username, req.body.website, function(err, user) {
      if(err) return res.send({ "error" : err });
      return res.send(user);
    });
  });

module.exports = router;
