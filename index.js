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

    function addToMessageQueue (command) {
        return function () {
            globalMessageQueue.push({
                player: player,
                type: command,
                timestamp: Date.now(),
            });
        };
    }

    socket.on('PLAYER_JOIN', addToMessageQueue('PLAYER_JOIN'));
    socket.on('PLAYER_ACTION_UP', addToMessageQueue('PLAYER_ACTION_UP'));
    socket.on('PLAYER_ACTION_DOWN', addToMessageQueue('PLAYER_ACTION_DOWN'));
    socket.on('PLAYER_ACTION_LEFT', addToMessageQueue('PLAYER_ACTION_LEFT'));
    socket.on('PLAYER_ACTION_RIGHT', addToMessageQueue('PLAYER_ACTION_RIGHT'));
});


// Update all clients with global state
setInterval(function () {

    var messageQueueToBeProcessed = globalMessageQueue.slice();
    globalMessageQueue.length = 0;

    var filteredCommands = commandHandler(messageQueueToBeProcessed);

    processMoves(globalState, filteredCommands);
    processBombs(globalState, filteredCommands);

    app.emit('SERVER_STATE', globalState);

}, serverTimerInterval);


app.listen(3000);