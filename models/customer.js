var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name:{type:String,required:true},
  email: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: String, required: true },
  
});

module.exports = mongoose.model('Customers', postSchema);
