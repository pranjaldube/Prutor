var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express();//.Router();
var mongooseuri = "localhost:27017/iitpal"
var jsonParser = bodyParser.json()

mongoose.connect("mongodb://localhost:27017/iitpal", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var TestQuizSchema = new mongoose.Schema({
    eventname: String,
    coursename: String
});

mongoose.model('TestQuiz', TestQuizSchema);

global.nosql = mongoose;

router.get('/crud', function(req, res) {
 
 	var event_name=req.query.event_name;
							res.render('crud', {
							title: 'Prutor',
							username: '',
							role: '',
							enableScratch: false,
							
							notifications: req.session.notifications,
							//reportdata: JSON.stringify(results),
							stime: new Date()
						});
 });


 router.post('/add_events', jsonParser, function(req, res) {
 	var slp = require('../app_modules/slp.js'); 

	 console.log(req.body)
	
	var eventname=req.body.eventname;
	var coursename=req.body.coursename;
	//res.send("test");
	slp.add_events(eventname, coursename  ,   function(err, eventdata) {
		if(err){
		res.send(err);
		}
		else{
  	res.json(eventdata);
		}
	});
});

router.get('/get_events', function(req, res) {
 	var slp = require('../app_modules/slp.js'); 

	slp.get_events(  function(err, eventdata) {
		if(err){
		res.send(err);
		}
		else{
  	res.json(eventdata);
		}
	});
});
router.get('/get_event', function(req, res) {
 	var slp = require('../app_modules/slp.js'); 
	
	var id=req.query.id;
	//res.send(id);
	slp.get_event(id,  function(err, eventdata) {
		if(err){
		res.send(err);
		}
		else{
  	res.json(eventdata);
		}
	});
});

router.post('/update_event', function(req, res) {
 	var slp = require('../app_modules/slp.js'); 

	var id=req.body.id;
  var eventname=req.body.eventname;
	var coursename=req.body.coursename;
	slp.update_event(id,eventname,coursename, function(err, eventdata) {
		if(err){
		res.send(err);
		}
		else{
  	res.json(eventdata);
		}
	});
});
router.post('/delete_event', function(req, res) {
  	var slp = require('../app_modules/slp.js'); 
    var id=req.body.id;
	slp.delete_event(id,  function(err, eventdata) {
		if(err){
		res.send(err);
		}
		else{
  	res.json(eventdata);
		}
	});
});


router.listen(
	3000, function() {
		console.log("hello world")
	}
)