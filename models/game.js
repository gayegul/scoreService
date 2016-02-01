var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var GameSchema = new Schema({
  name: { type: String, required: true, index: { unique: true }},
  website: { type: String, required: true},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } //foreign key ObjectId
  // scoringtype: if low is good do smth, if high is good do the opposite
});

GameSchema.index({ name: 1, website: 1 }, { unique: true });
GameSchema.index({ name: 1, user: 1 }, { unique: true });
GameSchema.index({ website: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Game', GameSchema);

//TODO
//find a better way to index it
