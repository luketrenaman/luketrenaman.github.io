module.exports = function (object, tilemap, dbg) {
    if (object === "handle" && dbg) {
        for (i = 0; i < tilemap.length; i++) {
            for (j = 0; j < tilemap[i].length; j++) {
                tilemap.debug[i][j].tint = 0xAAAAFF;
            }
        }
        return;
    }
    var left = Math.floor(object.x / 25);
    var right = Math.floor((object.x + object.width) / 25);
    var top = Math.floor(object.y / 25);
    var bottom = Math.floor((object.y + object.height) / 25);
    if (left < 0) left = 0;
    if (right > tilemap[0].length) right = tilemap[0].length;
    if (top < 0) top = 0;
    if (bottom > tilemap.length - 1) bottom = tilemap.length - 1;
    var collision = false;
    for (var i = left; i <= right; i++) {
        for (var j = top; j <= bottom; j++) {
            if (dbg && tilemap.debug[j] && tilemap.debug[j][i]) tilemap.debug[j][i].tint = 0x00FF00;
            var t = tilemap[j][i];
            if (t === "-" || t === "#" || t === 1) {
                collision = true;
                if (dbg) tilemap.debug[j][i].tint = 0xFF0000;
            }
        }
    }
    return collision;
};