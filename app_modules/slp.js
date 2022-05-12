var slps = {};
// var mongoose= require('mongoose');
// global.nosql=mongoose;

nosql=global.nosql
console.log(nosql)
function add_events(eventname, coursename  ,  callback){
		var TestQuiz = nosql.model('TestQuiz');
		var entry = new TestQuiz({

		eventname: eventname,
		coursename: coursename
		});
		entry.save(function(err, entry) {
		if(err)
		callback(err, false);
		if(callback)
		callback(null, entry);
		});
					
}

function get_events(  callback){
	var TestQuiz = nosql.model('TestQuiz');
	TestQuiz.find({},function(err, entries) {
	if(err)
	callback(err, false);
	if(callback){
	callback(null, entries);
	}
	});	
}
function get_event(id, callback){
	var TestQuiz = nosql.model('TestQuiz');
	TestQuiz.find({_id: nosql.Types.ObjectId(id)},function(err, entry) {
	if(err)
	callback(err, false);
	if(callback){
	callback(null, entry);
	}
	});	
}

function get_event(id,  callback){
	var TestQuiz = nosql.model('TestQuiz');
	TestQuiz.find({_id: nosql.Types.ObjectId(id)},function(err, entry) {
	if(err)
	callback(err, false);
	if(callback){
	callback(null, entry);
	}
	});	
}

function update_event(id,eventname, coursename  ,   callback){	
        var TestQuiz = nosql.model('TestQuiz');
	TestQuiz.update({_id: nosql.Types.ObjectId(id)} , { $set: { eventname : eventname,coursename:coursename} },{upsert: false},function(err, entry) {
	if(err)
	callback(err, false);
	if(callback){
	callback(null, entry);
	}
	});
}
function delete_event(id,  callback){
	var TestQuiz = nosql.model('TestQuiz');
	TestQuiz.remove({_id: nosql.Types.ObjectId(id)},function(err, entry) {
	if(err)
	callback(err, false);
	if(callback){
	callback(null, entry);
	}
	});	
}
slps.delete_event=delete_event;
slps.update_event=update_event;
slps.get_event=get_event;
slps.get_events=get_events;
slps.add_events=add_events;


module.exports = slps;

