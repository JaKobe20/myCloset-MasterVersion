var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
var Clothe = mongoose.model('Clothe');
var Comment = mongoose.model('Comment');



router.get('/clothes', function(req, res, next) {
	Clothe.find(function(err, clothes) {
		if (err) { next(err); }

		res.json(clothes);
	})
});



router.post('/clothes', function(req, res, next) {
	var clothe = new Clothe(req.body);

	clothe.save(function(err, clothe) {
		if (err) { return next(err); }

		res.json(clothe);

	});
});


router.param('clothe', function(req,res,next,id) {
	var query = Clothe.findById(id);

	query.exec(function (err, clothe) {
		if (err) { return next(err); }
		if (!clothe) { return next(new Error("can't find clothe")); }

		req.clothe = clothe;
		return next();

	})
});


router.param('comment', function(req,res,next,id) {
	var query = Comment.findById(id);

	query.exec(function (err, clothe) {
		if (err) { return next(err); }
		if (!clothe) { return next(new Error("can't find clothe")); }

		req.comment = comment;
		return next();

	});
});


router.get('/clothes/:clothes', function(req, res) {
	req.clothe.populate('comments', function(err,clothe) {
		res.json(req.clothe);
	});
});


router.post('/clothes/:clothe/comments', function(req,res,next) {
	var comment = new Comment(req.body);
	comment.clothe = req.clothe;

	comment.save(function(err,comment) {
		if (err) { return; }

		req.clothe.comments.push(comment);
		req.clothe.save(function(err,clothe) {

			res.json(comment);
		});
	});

});


module.exports = router;


