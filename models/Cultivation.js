var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    type:{type:String,require:true},
    feedName: { type: String },
    farmOwner: { type: String },
    tankId: { type: String },
    quantity: { type: Number},
    unit: { type: String, default:'gm'},
    medicines: { type: Array},
    frequencyDetails: { type: Object},
    leftCheckNet:{type: Object},
    serverity:{type:String},
    conditionFilePath:{type:String},
    waterPhReport:{type:Object},
    waterTributeReport:{type:Object},
    waterDoReport:{type:Object},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()},
});

module.exports = mongoose.model('Cultivation', postSchema,'Cultivation');
