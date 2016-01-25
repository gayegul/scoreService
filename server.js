module.exports = function() {
  var express = require('express');
  var userRouter = require('./routes/userRouter');
  var playerRouter = require('./routes/playerRouter');
  var gameRouter = require('./routes/gameRouter');
  var scoreRouter = require('./routes/scoreRouter');

  var bodyParser = require('body-parser');
  var app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('This is the home page!');
  });

  app.use('/api', userRouter);
  app.use('/api', playerRouter);
  app.use('/api', gameRouter);
  app.use('/api', scoreRouter);

  return app;
};
