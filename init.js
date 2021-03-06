var initMap = require('./initMap');
var initPlayer = require('./initPlayer');

// Initialize globalState here
function initialization (globalState, globalConfigs) {
    // Init map
    globalState.map = initMap(
        globalConfigs.map.width,
        globalConfigs.map.height,
        globalConfigs.map.numBlocks
    );
};

module.exports = initialization;
