//Model Definition

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: {
		type: String,
		required: 'Kindly enter the name of the task'
	},
	Created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
		type: String,
		enum: ['pending', 'ongoing', 'completed']
	}],
	default: ['pending']
	}
});

module.exports = mongoose.model('Tasks', TaskSchema);

//Route definition

'use strict';
module.exports = function(app) {
	var todoList = require('../controllers/todoListController');
	
	// todoList Routes
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);
		
	app.route('/tasks/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);
};

//Controller definition

'use strict';
var mongoose = require('mongoose'),
	Task = mongoose.model('Tasks');
	
exports.list_all_tasks = function(req, res) {
	Task.find({}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.create_a_task = function(req, res) {
	var new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.read_a_task = function(req, res) {
	Task.findById(req.params.taskId, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.update_a_task = function(req, res) {
	Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err,
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.delete_a_task = function(req, res) {
	Task.remove({
		_id: req.params.taskId
	}, function(err, task) {
	   if (err)
	      res.send(err);
	   res.json({ message: 'Task successfully deleted' });
	});
};

//Update Server.js

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Task = require('./api/models/todoListModel'), //created model loading here
	bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
