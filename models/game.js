var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var GameSchema = new Schema({
  name: { type: String, required: true},
  website: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } //foreign key
  // scoringtype: if low is good do smth, if high is good do smth else
});

module.exports = mongoose.model('Game', GameSchema);
