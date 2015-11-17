var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, index: { unique: true }},
  password: { type: Number, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Player', PlayerSchema);
