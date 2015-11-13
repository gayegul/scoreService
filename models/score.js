var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  game: String, //relate it to a game id
  player: String, //relate it to a id of the player
  scores: [Number]
});

module.exports = mongoose.model('Score', ScoreSchema);
