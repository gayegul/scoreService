var express = require('express');
var router = express.Router();
var app = require('../lib/app');

router.use(function(req, res, next) {
  //console.log('I am a middleware to auth soon.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'This is our API.'});
});

router.route('/users')
  //creates a user
  .post(function(req, res) {
    app.createUser(req.body.username, req.body.website, function(err, user) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(user);
    });
  });

router.route('/users/:username')
  //deletes the specified user
  .delete(function(req, res) {
    app.deleteUser(req.params.username, function(err) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send({ 'message' : 'User deleted.' });
    });
  })
  //returns the user
  .get(function(req, res) {
    app.getUser(req.params.username, function(err, user) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(user);
    });
  })
  //updates user info
  .put(function(req, res) {
    app.updateUser(req.params.username, req.body.username, req.body.website, function(err, user) {
      if(err) return res.status(500).send({ 'error' : err });
      return res.send(user);
    });
  });

module.exports = router;
