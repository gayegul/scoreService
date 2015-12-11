var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');
var Player = require('./player');

var ScoreSchema = new Schema({
  game: { type: Schema.Types.Mixed, ref: 'Game', required: true },
  player: { type: Schema.Types.Mixed, ref: 'Player', required: true },
  score: { type: Number, required: true }
});

ScoreSchema.index({ game: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('Score', ScoreSchema);
