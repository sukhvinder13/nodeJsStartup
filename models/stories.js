var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // "_id":  { type: String },
    "name":  { type: String },
    "email":  { type: String },
    "story":  { type: String },
    "createdBy":  { type: String },
    "createdOn": { type: Date }
});

module.exports = mongoose.model('stories', postSchema);
