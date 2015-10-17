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

	commands.forEach(function(command) {
		if (command.type in moves) {
			moves[command.type](state.players[command.player], state.map);

			// TODO check if player moved over bomb. if so, set the hasBomb status to true!

			process.stdout.write(command.player + ' x moved to: ' + state.players[command.player].x.toString() + '\n');
			process.stdout.write(command.player + ' y moved to: ' + state.players[command.player].y.toString());
		}
	});
}

module.exports = processMoves;
