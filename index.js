var http = require('http');
var socketIo = require('socket.io');

var server = http.createServer();
var app = socketIo(server);

var initialize = require('./init');


// Global configs
var serverTimerInterval = 1000;


// Initialization goes here
//==============================

// Default
var globalState = {
    players: {},
    scores: {},
    bombs: {},
    map: [],
};
var globalMessageQueue = [];

initialize(globalState);


app.on('connection', function(socket){
    console.log('a user connected');
});


// Update all clients with global state
setInterval(function () {
    socket.emit('SERVER_STATE', globalState);
}, serverTimerInterval);


app.listen(3000);