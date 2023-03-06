var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // type:{type:String,require:true},
    farmId:{type:String},
    tankId: { type: String },
    pictureFilePath:{type:String}
});

module.exports = mongoose.model('AddPicture', postSchema);
