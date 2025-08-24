module.exports = function(arr, player1, stage, dbg) {
    var shapes = require("./shapes");
    //Map size is 20 blocks tall and 32 wide
    //0 is grass 1 is dirt
   function getName(x, y, types = ["-","#",1]) {
  let l = types.includes(arr[y][x-1]),
      t = arr[y-1] && types.includes(arr[y-1][x]),
      r = types.includes(arr[y][x+1]),
      b = arr[y+1] && types.includes(arr[y+1][x]),
      tl = arr[y - 1] && types.includes(arr[y - 1][x - 1]),
      tr = arr[y - 1] && types.includes(arr[y - 1][x + 1]),
      br = arr[y + 1] && types.includes(arr[y + 1][x + 1]),
      bl = arr[y + 1] && types.includes(arr[y + 1][x - 1]);
  return [
    (l & t ? +tl : 0),    +t||0,    (r & t ? +tr : 0),
    +l,                                             +r,
    (l & b ? +bl : 0),    +b||0,    (r & b ? +br : 0)
  ];
}
    var debug = [];
    for (var i = 0; i < arr.length; i++) {
        debug.push([]);
        arr[i].forEach(function(cell, j) {
            switch (cell) {
                case " ":
                case 0:
                    if (dbg) {
                        cell = new PIXI.Sprite(require("./dirt")(null,true));
                        cell.x = j * 25;
                        cell.y = i * 25;
                        stage.addChild(cell);
                    }
                    break;
                case "-":
                case "#":
                case 1:
                    //PIXI.loader.resources["assets/tile.png"].texture
                    var stuff = []
                    cell = new PIXI.Sprite(require("./dirt")(getName(j, i),dbg));
                    cell.x = j * 25;
                    cell.y = i * 25;
                    stage.addChild(cell);
                    break;
                case "p":
                    if (dbg) {
                        cell = new PIXI.Sprite(require("./dirt")(null,true));
                        cell.x = j * 25;
                        cell.y = i * 25;
                        stage.addChild(cell);
                    }
                    player1.x = j * 25;
                    player1.y = i * 25;
                    break;
                case "g":
                    cell = new PIXI.Sprite(shapes.rectangle(25, 25, "#3498db"));
                    cell.x = j * 25;
                    cell.y = i * 25;
                    break;
                case "f":
                    break;
            }
            debug[i].push(cell);
        })
    }
    console.log(arr);
    arr.debug = debug
    return arr;
};