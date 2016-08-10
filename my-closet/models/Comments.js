var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	
	comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Clothe'}

});


mongoose.model('Comment', CommentSchema);

