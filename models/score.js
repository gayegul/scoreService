var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./game');
var Player = require('./player');

var ScoreSchema = new Schema({
  game: String, //{ type: Schema.Types.ObjectId, ref: 'Game', required: true }, //String, //relate it to a game id
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  scores: [Number] //[{ type: Schema.Types.ObjectId, ref: 'Player', required: true }]
});

module.exports = mongoose.model('Score', ScoreSchema);
