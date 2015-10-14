
/*

 Depends on init_player.js
 Assumes movements have already been made.
 map format:

	[
	[0,0,0,0,1,0],
	[0,1,0,1,0,0],
	...
	]

 global state object is:
 globalState
 
*/

function gen_bomb_list(messages){
	var bomb_list = [];
	for (i = 0; i < messages.length; i++){
		if (messages[i].type == 'PLAYER_ACTION_BOMB')
			bomb_list.push(messages[i].player);
	}

	return bomb_list;
}

function player_in_bomb(player_id, bomber_id) {
	// assume bomb range of 3
	var bx = globalState.players[bomber_id].x;
	var by = globalState.players[bomber_id].y;
	var px = globalState.players[player_id].x;
	var py = globalState.players[player_id].y;

	var a = bx - px;
	var b = by - py;

	return Math.sqrt( a*a + b*b ) < 3;
}

function bomb(messages) {
	// for all players,
	//   for all bombs,
	//      is player within bomb radius? (square... easier :P)
	// messages structure:
	// [{'type': 'PLAYER_ACTION_BOMB', 'player': '...'}, ...]

	bomb_list = gen_bomb_list(messages);

	for (var player_id in globalState.players) {
		if (p.hasOwnProperty(player)) {
			for (i = 0; i < bomb_list.length; i++) {
				bomber_id = bomb_list[i];
				if player_in_bomb(player_id, bomber_id) {
					get_unique_position(player_id);
				}

				globalState.players[bomb_list[i]].hasBomb = fase;
			}
		}
	}

}
