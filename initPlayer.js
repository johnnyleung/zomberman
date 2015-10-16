function spawn() {
	return {
		x: Math.floor((Math.random() * 20) + 1),
		y: Math.floor((Math.random() * 20) + 1),
		hasBomb: false
	};
}

function initPlayer (state, player_id) {
	state.players[player_id] = spawn();
}

module.exports = initPlayer;
