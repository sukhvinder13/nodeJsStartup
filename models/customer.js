var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  "username": { type: String },
  "name": { type: String },
  "address": { type: String },
  "birthdate": { type: Date },
  "email": { type: String },
  "accounts": { type: Array },
  "tier_and_details": { type: Object }
});

module.exports = mongoose.model('Customers', postSchema);
