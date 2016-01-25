//node boot.js starts the app

var mongoose = require('mongoose');
var server = require('server');
mongoose.connect('mongodb://localhost:27017/scoreBoard', function(err) {
  if(err) return console.log('mongo failed to start ' + err);
  var app = server();
  var port = process.env.PORT || 3000;
  app.listen(port);
});
