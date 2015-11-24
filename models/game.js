var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var GameSchema = new Schema({
  name: { type: String, required: true, index: { unique: true }},
  website: { type: String, required: true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } //foreign key
  // scoringtype: if low is good do smth, if high is good do the opposite
});

module.exports = mongoose.model('Game', GameSchema);
