var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // "_id":  { type: String },
    "name":  { type: String },
    "email":  { type: String },
    "sent":  { type: String },
    "received":  { type: String },
    "from": { type: String },
    "to":  { type: String },
    "message":{type: String },
    "createdBy":  { type: String },
    "updatedBy":  { type: String },
    "lastModified":  { type: Date },
    "createdOn": { type: Date }
});

module.exports = mongoose.model('conversations', postSchema);
