var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true }
});
mongoose.model('User', UserSchema);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User');
