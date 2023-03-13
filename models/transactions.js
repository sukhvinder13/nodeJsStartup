var mongoose = require('mongoose');

const transactions = mongoose.Schema({
    farmId:{type:String,required:true},
  });
  module.exports = mongoose.model('Transactions', transactions);