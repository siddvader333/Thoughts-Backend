// express
var express = require('express');
var app = express();

// socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http, { cookie: false });

// turn off unnecessary header
app.disable('x-powered-by');

// turn on strict routing
app.enable('strict routing');

// use the X-Forwarded-* headers
app.enable('trust proxy');

// add CORS headers
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

io.on('connection', function(socket) {
	console.log('connected');

	socket.on('send-thought', (data) => {
		console.log('send-thought received');
		console.log(data);
		socket.broadcast.emit('receive-thought', data);
	});
});

var server = http.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port %d.', server.address().port);
});
