module.exports = function (x, dbg) {
    var shapes = require("./shapes");
    var lighten = require("./lighten");
    var canvas = require("./shapes").canvas(25, 25);
    var condition = false;
    //5d2e0d
    //228B22
    //x,y,width,height
    var bounds = "01112\n3   4\n3   4\n3   4\n56667".split("\n").map(function (val) {
        return val.split("");
    });
    for (i = 0; i < 25; i++) {
        for (j = 0; j < 25; j++) {
            if (dbg && (i == 0 || i == 24 || j == 0 || j == 24)) {
                canvas.ctx.fillStyle = "#000";
            } else if (x === null) {
                canvas.ctx.fillStyle = "#18212b";
            } else {
                if (x[bounds[Math.floor(j / 5)][Math.floor(i / 5)]] === 0) {
                    //Grass
                    canvas.ctx.fillStyle = "#" + lighten("2c3e50", Math.random() * 15 - 20);
                } else {
                    //Not Grass
                    canvas.ctx.fillStyle = "#" + lighten("34495e", Math.random() * 10 - 10);
                }
            }
            canvas.ctx.fillRect(i, j, 1, 1);
        }
    }
    return PIXI.Texture.fromCanvas(canvas.canvas);
};