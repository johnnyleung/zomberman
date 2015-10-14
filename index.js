var http = require('http');
var socketIo = require('socket.io');

var server = http.createServer();
var app = socketIo(server);

var initialize = require('./init');
var commandHandler = require('./commandHandler');


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
    var player = socket.conn.id;

    function sendToCommandHandler (command) {
        return function () {
            commandHandler({
                player: player,
                type: command
            });
        };
    }

    socket.on('PLAYER_JOIN', sendToCommandHandler('PLAYER_JOIN'));
    socket.on('PLAYER_ACTION_UP', sendToCommandHandler('PLAYER_ACTION_UP'));
    socket.on('PLAYER_ACTION_DOWN', sendToCommandHandler('PLAYER_ACTION_DOWN'));
    socket.on('PLAYER_ACTION_LEFT', sendToCommandHandler('PLAYER_ACTION_LEFT'));
    socket.on('PLAYER_ACTION_RIGHT', sendToCommandHandler('PLAYER_ACTION_RIGHT'));
});


// Update all clients with global state
setInterval(function () {
    app.emit('SERVER_STATE', globalState);
}, serverTimerInterval);


app.listen(3000);