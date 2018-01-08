var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, index: true, unique: true },
  password: { type: String },
  gender: {type: String},
  about: {type: String},
  location: {type: String},
  picture: {type: String},
  occupation: {type: String},
  facebook_token: { type: String},
  facebook_id: { type: Number}
});
mongoose.model('User', UserSchema);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User');
