function illegal_move(player, map) {
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map.length; j++) {
			if (player.x == j && player.y == i) {
				if (map[i][j] == 1) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
	return false;
}

var moves = {
	'PLAYER_ACTION_UP': function(player, map) {
		player.y += 1;
		if (illegal_move(player, map)) {
			player.y -= 1;
		}
	},
	'PLAYER_ACTION_DOWN': function(player, map) {
		player.y -= 1;
		if (illegal_move(player, map)) {
			player.y += 1;
		}
	},
	'PLAYER_ACTION_LEFT': function(player, map) {
		player.x -= 1;
		if (illegal_move(player, map)) {
			player.x += 1;
		}
	},
	'PLAYER_ACTION_RIGHT': function(player, map) {
		player.x += 1;
		if (illegal_move(player, map)) {
			player.x -= 1;
		}
	}
};

function processMoves (state, commands) {

	if (commands == null)
		return;

	console.log(commands);

	commands.forEach( function(command) {
		if (command.type in moves) {
			console.log('move is valid');
			moves[command.type](state.players[command.player], state.map);

			process.stdout.write(command.player + ' x moved to: ' + state.players[command.player].x.toString() + '\n');
			process.stdout.write(command.player + ' y moved to: ' + state.players[command.player].y.toString());

			// if the player goes over a bomb that isn't owned, the
			// player now owns the bomb
			for (var bomb in state.bombs) {
				if (bomb.x == state.players[command.player].x && bomb.y == state.players[command.player].y) {
					if (bomb.player == "") {
						state.players[command.player].hasBomb = true;
						bomb.player = command.player;
					}
				}
			}
		}
	});
}

module.exports = processMoves;
