var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');

var ScoreSchema = new Schema({
  //Used .ObjectId to reference another model
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  score: { type: Number, required: true }
});

ScoreSchema.index({ game: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('Score', ScoreSchema);
