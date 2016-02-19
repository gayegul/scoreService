var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Score = require('./score');

var PlayerSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  email: { type: String, required: true }
});

//removes the player's score as well when player is deleted
PlayerSchema.pre('remove', function(next) {
  Score.remove({ player : this._id }).exec();
  next();
});

module.exports = mongoose.model('Player', PlayerSchema);
