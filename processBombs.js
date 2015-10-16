
/*

 Depends on init_player.js
 Assumes movements have already been made.
*/

function gen_bomb_list(messages){
	var bomb_list = [];
	messages.forEach(function(message) {
		if (message.type == 'PLAYER_ACTION_BOMB')
			bomb_list.push(message.player);
	});

	return bomb_list;
}

function player_in_bomb(player, bomber) {
	// assume bomb range of 3
	var bx = bomber.x;
	var by = bomber.y;
	var px = player.x;
	var py = player.y;

	var a = bx - px;
	var b = by - py;

	return Math.sqrt( a*a + b*b ) < 3;
}

function reset_player(globalState, player_id){
	var new_pos = getUniquePosition(player_id);
	globalState.players[player_id].x = new_pos.x;
	globalState.players[player_id].y = new_pos.y;
}

function processBombs(globalState, messages) {
	// for all players,
	//   for all bombs,
	//      is player within bomb radius? (square... easier :P)
	// messages structure:
	// [{'type': 'PLAYER_ACTION_BOMB', 'player': '...'}, ...]

	if (messages == null)
		return

	var bomb_list = gen_bomb_list(messages);

	for (var player_id in globalState.players) {
		if (globalState.players.hasOwnProperty(player_id)) {
			bomb_list.forEach(function(bomber_id){
				var player = globalState.players[player_id];
				var bomber = globalState.players[bomber_id];
				if (player_in_bomb(player, bomber) && player_id != bomber_id) {
					reset_player(globalState, player_id);
				}

				// reset bomb to false
				globalState.players[bomber_id].hasBomb = false;
			});
		}
	}

}

module.exports = processBombs;
