var mongoose = require('mongoose');

// const Users = mongoose.Schema({
//   email:{type:String,required:true},
//   tankId:{type:String,required:true}
// });

// module.exports = mongoose.model('Users', Users);


const tweetSchema = mongoose.Schema({
  farmId:{type:String,required:true},
  tankId:{type:String,required:true}
});

module.exports = mongoose.model('Tweets', tweetSchema);

const sales = mongoose.Schema({
  farmId:{type:String,required:true},
  village: { type: String, required: true },
  country: { type: String, required: true },
  noOfTanks: { type: String, required: true },
  noOfEmployess: { type: String, required: true },
});

module.exports = mongoose.model('Sales', sales);