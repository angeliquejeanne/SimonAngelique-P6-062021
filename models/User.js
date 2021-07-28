const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

//création du schéma strict User
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//email unique via mongoose-unique-validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);