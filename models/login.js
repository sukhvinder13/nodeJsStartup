var mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    // type:{type:String,require:true},
    username:{type:String},
    password: { type: String },
});

module.exports = mongoose.model('Users', loginSchema);
