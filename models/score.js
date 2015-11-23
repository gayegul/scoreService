var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');
var Player = require('./player');

var ScoreSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true }, //String, //relate it to a game id
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  score: { type: Number, required: true } //[{ type: Schema.Types.ObjectId, ref: 'Player', required: true }]
});

ScoreSchema.index({ game: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('Score', ScoreSchema);
