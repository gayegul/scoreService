var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  website: String
});

module.exports = mongoose.model('User', UserSchema);
