var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    farm_owner:{type:String, required: true},
    tank:{type:String, required: true},
    medicine: { type: String , required: true},
    dosage: { type: Number, required: true }

});
module.exports = mongoose.model('AddFarmMedicine', postSchema);
