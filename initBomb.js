function randomPoint() {
	// doesn't care if re-spawns in blocks
	// this is temporary
	return {
		x: Math.floor((Math.random() * 20) + 1),
		y: Math.floor((Math.random() * 20) + 1),
		player: ""
	};
}

function initBomb (state) {
	// store max bombs here temporarily
	var MAX_BOMBS = 2;

	// if there are too few bombs, generate enough to meet quota
	if (Object.keys(state.bombs).length < MAX_BOMBS) {
		var numBombs = Object.keys(state.bombs).length;
		var numBombsNeeded = MAX_BOMBS - numBombs;
		for (i = 0; i < numBombsNeeded; i++)
			// make sure the keys don't conflict with existing
			// ones. start the name from last one in bomb list
			state.bombs[(numBombs + i).toString()] = randomPoint();
	}
}

module.exports = initBomb;
