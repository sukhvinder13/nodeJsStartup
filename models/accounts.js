var mongoose = require('mongoose');
const accounts = mongoose.Schema({
  farmId:{type:String,required:true},
  village: { type: String, required: true },
  country: { type: String, required: true },
  noOfTanks: { type: String, required: true },
  noOfEmployess: { type: String, required: true },
});

module.exports = mongoose.model('Accounts', accounts);
