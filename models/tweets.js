var mongoose = require('mongoose');


const Tweets = mongoose.Schema({
  text:{type:String,required:true},
  in_reply_to_status_id: { type: String, required: true },
  created_at: { type: Date },
  geo: { type: String },
  source: { type: String },
  coordinates: { type: String },
  in_reply_to_status_id: { type: String },
  truncated: { type: Boolean },
  in_reply_to_screen_name: { type: String },
  entities: { type: Object },
  retweeted: { type: Boolean },
  place: { type: String },
  user: { type: Object },
  favorited: { type: Boolean },
  in_reply_to_user_id: { type: String },
  id: { type: Number },
});

module.exports = mongoose.model('Tweets', Tweets);
