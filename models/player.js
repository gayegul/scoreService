var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true }},
  password: Number,
  email: String
});

module.exports = mongoose.model('Player', PlayerSchema);
