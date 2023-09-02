var mongoose = require('mongoose');

const users = mongoose.Schema({
    email:{type:String},
    id: { type: String },
  });
  
  module.exports = mongoose.model('Users', users);