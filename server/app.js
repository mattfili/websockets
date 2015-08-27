'use strict';

var express = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

var server = app.listen(3000, function () {
	console.log('Server listening on port 3000');
});

var io = socketio(server);

io.on('connection', function (socket) {
	console.log('client connected: ', socket.id);

	socket.on('disconnect', function () {
		console.log('Client disconnected: ', socket.id);
	});

	socket.on('chatMessage', function (msg) {
		console.log('Chat message received', msg);

			// // sends to one person (socket.id)
			// socket.emit('chatMessage', {toOne: msg});

			// sends to all
			io.emit('chatMessage', {toEveryone: msg});

			// // sends to everyone but the current socket
			// socket.broadcast.emit({toOthers: msg});

	});

});

