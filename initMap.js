function initMap(size_width, size_height, num_blocks){
	var map = new Array(size_width);
	for (var x = 0; x < size_width; x++){
		map[x] = new Array(size_height);
		for (var y = 0; y < size_height; y++)
			map[x][y] = 0;
	}

	for (var index = 0; index < num_blocks; index++){
		rand_x = Math.floor((Math.random() * size_width));
		rand_y = Math.floor((Math.random() * size_height));
		map[rand_x][rand_y] = 1;
	}
	return map;
}