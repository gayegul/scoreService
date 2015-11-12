var express = require('express');
var mongoose = require('mongoose');
var userRouter = require('./routes/userRouter');
var bodyParser = require('body-parser');
var gameRouter = require('./routes/gameRouter');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('This is the useless home page!');
});

app.use('/api', userRouter);
app.use('/api', gameRouter);
mongoose.connect('mongodb://localhost:27017/scoreBoard');
app.listen(port);
