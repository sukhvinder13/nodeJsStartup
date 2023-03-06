var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
  // address: { type: String, required: true },
  // referral: { type: String, required: true },
  // pan: { type: String, required: true },
  // adhaar: { type: String, required: true },
  // panFile: { type: String },
  // adhaarFile: { type: String },
  // companyName: { type: String, required: true },
  // companyPan: { type: String, required: true },
  // companyAdhaar: { type: String, required: true },
  // companyGstNo: { type: String, required: true },
  // companyPanFile: { type: String },
  // companyAdhaarFile: { type: String },
});
module.exports = mongoose.model('AddFarmOwner', postSchema);
