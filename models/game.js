var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var GameSchema = new Schema({
  name: String,
  website: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } //foreign key
});

module.exports = mongoose.model('Game', GameSchema);
