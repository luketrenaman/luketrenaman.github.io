var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var d = document.getElementById("neighbors");
var dtx = d.getContext("2d");
var world = [];
var tiles = 100;
var scale = 800/tiles;
var border = true;
var next = []
function check(x,y,hori, verti) {

    return world[(y + verti + world.length) % world.length][(x + hori + world.length) % world.length];
}
function neighbors(x, y) {
    var total = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
        	if(!(j == 0 && i == 0))
{            	total += check(x,y,i, j);
        	}
        }
    }
    return total;
}

function color(x) {
    if (x) return "#fff"
    return "#333"
}
for (let i = 0; i < tiles; i++) {
    world.push([]);
    next.push([]);
    for (let j = 0; j < tiles; j++) {
        world[i].push(Math.round(Math.random()));
        next[i].push(0);
    }
}
//0,1
//1,2
//2,0 - 3
function paint(y,x){
var o = 1;
world[x+o][y+o] = 1;
}
paint(1,0);
paint(1,1);
paint(1,2);
function partialRender(x,y){
    ctx.beginPath();
    ctx.rect(x*scale+!border, y*scale+!border, scale-border, scale-border);
    ctx.fillStyle = color(world[x][y]);
    ctx.fill();
}
function render(){
	for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
            ctx.beginPath();
            ctx.rect(i*scale+!border, j*scale+!border, scale-border, scale-border);
            ctx.fillStyle = color(world[i][j]);
            ctx.fill();
            
        }
    }
}
function step() {
    for (let i = 0; i < tiles; i++) {
        for (let j = 0; j < tiles; j++) {
        	var x = neighbors(j, i);
            if (world[i][j] == 0) {
            	if(x === 3){
                	next[i][j] = 1;
            	} else{
            		next[i][j] = 0;
            	}
            } else if (world[i][j] == 1) {
                if (x < 2 || x > 3) {
                    next[i][j] = 0;
                } else{
                	next[i][j] = 1;
                }
            }
            
        }
    }
    for(let i = 0; i < tiles; i++){
    	for(let j = 0; j < tiles;j++){
    		world[i][j] = next[i][j]
    	}
    }
}
let clicking = false
let mode = 0
document.getElementById("canvas").addEventListener('contextmenu', event => event.preventDefault());

document.getElementById("canvas").onmousedown = function(e){
    if(looping){
        clearInterval(loop);
        looping = false;
        document.getElementById("step").textContent = "Start";
    }
    function fix(n){
        return Math.floor(n/scale);
    }
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    console.log(e.button)
    if(e.button === 0){
        mode = 1;
    }
    if(e.button === 2){
        mode = 0;
    }
    world[fix(x)][fix(y)] = mode;
    partialRender(fix(x),fix(y))
	clicking = true
}
document.onmouseup = function(e){
	clicking = false
}
document.getElementById("canvas").onmousemove = function(e){
    //Update debug tooltips
    function fix(n){
		n = fix2(n) + 1;
		n = n.toString();
		if(n.length == 1){
			n = "0" + n;
		}
		return n;
	}
	function fix2(n){
		return Math.floor(n/scale);
	}
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	document.getElementById("cdis").innerHTML = "["+fix(x)+","+fix(y)+"] :: " + neighbors(fix2(y),fix2(x));
	x = fix2(x);
	y = fix2(y);
	for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            dtx.beginPath();
            dtx.rect(j*12+13, i*12+13, 11,11);
            dtx.fillStyle = color(check(y,x,i, j));
            dtx.fill();
        }
    }
    //Click and drag in current mode
    if(clicking){
        function fix(n){
            return Math.floor(n/scale);
        }
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        world[fix(x)][fix(y)] = mode;
        partialRender(fix(x),fix(y))
    }
}
function tick(){
	step()
	render()
}
let loop;
let looping = false
document.getElementById("step").onclick = function(){
    if(looping){
        clearInterval(loop);
        document.getElementById("step").textContent = "Start"
    } else{
        tick()
	    loop = setInterval(tick,100);
        document.getElementById("step").textContent = "Stop"
    }
    looping = !looping;
}
document.getElementById("clear").onclick = function(){
    if(looping){
        clearInterval(loop);
        document.getElementById("step").textContent = "Start"
        looping = false;
    }
    world = [];
    next = [];
    for (let i = 0; i < tiles; i++) {
        world.push([]);
        next.push([]);
        for (let j = 0; j < tiles; j++) {
            world[i].push(0);
            next[i].push(0);
        }
    }
    render()
}
tick()

