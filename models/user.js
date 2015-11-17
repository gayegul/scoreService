var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');

var UserSchema = new Schema({
  username: { type: String, required: true},
  website: String,
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }] //foreign key
});

module.exports = mongoose.model('User', UserSchema);
