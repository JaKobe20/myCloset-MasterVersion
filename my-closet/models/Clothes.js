var mongoose = require('mongoose');

var ClotheSchema = new mongoose.Schema({
	type: String,
	size: String,
	color: String,
	image: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]

});





mongoose.model('Clothe', ClotheSchema);

