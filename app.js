var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var Applicant = require('./models/applicantSchema')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/omega3');

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	// Applicant.find(function(err, applicants){
	// 	if (err) console.log('Errororor!');
	// 	else console.log(applicants);
	// });
	// var applicants = Applicant.find(function(err, applicants){
	// 	if (err) console.log('Errororor!');
	// 	// else console.log(applicants);
	// });
	// console.log(applicants);
	Applicant.find(function(err, applicants){
		if (err) console.log('Errororor!');
		res.render('applicants', {applicants: applicants});
	});
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	var applicant = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});
	applicant.save();
	res.redirect('/success');
});

app.post('/deleteApplicant', function(req, res){
	
	res.send(req);
	// Applicant.remove({_id = req.body._id})
});

app.get('/success', function(req, res){
	res.render('success');
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
