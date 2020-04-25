var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionsSchema = new Schema({
	'title' : String,
	'description' : String,
	'date' : Date,
	'user_id' : String,
	'answered' : Boolean,
	'tags' : String
});

module.exports = mongoose.model('questions', questionsSchema);
