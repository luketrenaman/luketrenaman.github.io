module.exports = function(object, tilemap) {
    var left = Math.floor((object.x+0.5) / 25);
    var right = Math.floor((object.x + object.width-0.5) / 25);
    var top = Math.floor((object.y+2) / 25);
    var bottom = Math.floor((object.y + object.height + 2) / 25);
    if (left < 0) left = 0;
    if (right > tilemap[0].length) right = tilemap[0].length;
    if (top < 0) top = 0;
    if (bottom > tilemap.length-1 ) bottom = tilemap.length-1;
    var collision = false;
    for (var i = left; i <= right; i++) {
        for (var j = top; j <= bottom; j++) {
            var t = tilemap[j][i];
            if (t === "-" || t === "#" || t === 1) {
                collision = true;
            }
        }
    }
    top = Math.floor((object.y-2) / 25);
    if (top < 0) top = 0;
    bottom = Math.floor((object.y + object.height - 2) / 25);
    if (bottom > tilemap.length-1 ) bottom = tilemap.length-1;
    for (var i = left; i <= right; i++) {
        for (var j = top; j <= bottom; j++) {
            var t = tilemap[j][i];
            if (t === "-" || t === "#" || t === 1) {
                collision = false;
            }
        }
    }
    return collision;
}; 