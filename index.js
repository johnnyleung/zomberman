var http = require('http');
var socketIo = require('socket.io');

var server = http.createServer();
var app = socketIo(server);

var initialize = require('./init');
var initPlayer = require('./initPlayer');
var commandHandler = require('./commandHandler');
var processMoves = require('./processMoves');
var processBombs = require('./processBombs');
var initBomb = require('./initBomb');


// Global configs
var globalConfigs = {
    map: {
        width: 20,
        height: 20,
        numBlocks: 50,
    },
    serverTimerInterval: 1000
};


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

initialize(globalState, globalConfigs);


app.on('connection', function(socket){
    var player = socket.conn.id;

    initPlayer(globalState, socket.conn.id);

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
    socket.on('PLAYER_ACTION_BOMB', addToMessageQueue('PLAYER_ACTION_BOMB'));
});


// Update all clients with global state
setInterval(function () {

    if (globalMessageQueue.length == 0) {
	process.stdout.write('no messages\n');
        return;
    }

    var messageQueueToBeProcessed = globalMessageQueue.slice();
    globalMessageQueue.length = 0;

    var filteredCommands = commandHandler(messageQueueToBeProcessed);

    processMoves(globalState, filteredCommands);
    processBombs(globalState, filteredCommands);
    // initBomb makes sure enough bombs exist in the ecosystem
    // even after one has been blown up
    initBomb(globalState);

    process.stdout.write('\ngame state: ' + JSON.stringify(globalState) + '\n');

    app.emit('SERVER_STATE', globalState);

}, globalConfigs.serverTimerInterval);


app.listen(3000);
