// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function getPlayerPositions(players) {
    var coordinateX = undefined,
        coordinateY = undefined,
        position = undefined,
        allPositions = {};
    for (var player in players) {
        if players.hasOwnProperty(player) {
            coordinateX = players[player]['x'];
            coordinateY = players[player]['y'];
            position = coordinateX.toString() + ',' + coordinateY.toString();
            allPositions[position] = 1
        }
    }

    return allPositions
}


function getUniquePosition() {
    var players = STATE['players']
        allPositions = undefined,
        positionsAssigned = false,
        coordinateX = undefined,
        coordinateY = undefined;

    allPositions = getPlayerPositions(players);
    while (!positionsAssigned) {
        coordinateX = getRandomArbitrary(0, 20);
        coordinateY = getRandomArbitrary(0, 20);
        // First check if the tile is blocked or not
        if (MAP[coordinateX][coordinateY] == 1) {
            continue
        }

        // Second check 
        var position = undefined,
        position = coordinateX.toString() + ',' + coordinateY.toString();
        if !(position in allPositions) {
            positionsAssigned = true;
        }
    }

    return {'x': coordinateX, 'y': coordinateY}
}


function generatePlayerPosition() {
    var playerPosition = getUniquePosition();

    return playerPosition
}

modules.export = generatePlayerPosition