var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    farmId:{type:String,required:true},
    tank:{type:String,required:true},
    time: { type: String, required: true },
    ph: { type: String, required: true }

});
module.exports = mongoose.model('AddFarmWaterReport', postSchema);