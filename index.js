var http = require('http');
var socketIo = require('socket.io');

var server = http.createServer();
var app = socketIo(server);

var initialize = require('init.js');


// Initialization goes here
//==============================
var globalState = {};
initialize(globalState);


app.on('connection', function(socket){
    console.log('a user connected');
});


app.listen(3000);