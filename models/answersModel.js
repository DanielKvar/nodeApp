var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var answersSchema = new Schema({
	'description' : String,
	'user_id' : String,
	'choosen' : Boolean,
	'question_id' : String,
	'date' : Date
});

module.exports = mongoose.model('answers', answersSchema);
