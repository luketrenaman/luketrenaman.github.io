/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";
	
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var d = document.getElementById("neighbors");
	var dtx = d.getContext("2d");
	var world = [];
	var tiles = 100;
	var scale = 800 / tiles;
	var border = true;
	var next = [];
	function check(x, y, hori, verti) {
	
	    return world[(y + verti + world.length) % world.length][(x + hori + world.length) % world.length];
	}
	function neighbors(x, y) {
	    var total = 0;
	    for (var i = -1; i <= 1; i++) {
	        for (var j = -1; j <= 1; j++) {
	            if (!(j == 0 && i == 0)) {
	                total += check(x, y, i, j);
	            }
	        }
	    }
	    return total;
	}
	
	function color(x) {
	    if (x) return "#fff";
	    return "#333";
	}
	for (var i = 0; i < tiles; i++) {
	    world.push([]);
	    next.push([]);
	    for (var j = 0; j < tiles; j++) {
	        world[i].push(Math.round(Math.random()));
	        next[i].push(0);
	    }
	}
	//0,1
	//1,2
	//2,0 - 3
	function paint(y, x) {
	    var o = 1;
	    world[x + o][y + o] = 1;
	}
	paint(1, 0);
	paint(1, 1);
	paint(1, 2);
	function partialRender(x, y) {
	    ctx.beginPath();
	    ctx.rect(x * scale + !border, y * scale + !border, scale - border, scale - border);
	    ctx.fillStyle = color(world[x][y]);
	    ctx.fill();
	}
	function render() {
	    for (var _i = 0; _i < tiles; _i++) {
	        for (var _j = 0; _j < tiles; _j++) {
	            ctx.beginPath();
	            ctx.rect(_i * scale + !border, _j * scale + !border, scale - border, scale - border);
	            ctx.fillStyle = color(world[_i][_j]);
	            ctx.fill();
	        }
	    }
	}
	function step() {
	    for (var _i2 = 0; _i2 < tiles; _i2++) {
	        for (var _j2 = 0; _j2 < tiles; _j2++) {
	            var x = neighbors(_j2, _i2);
	            if (world[_i2][_j2] == 0) {
	                if (x === 3) {
	                    next[_i2][_j2] = 1;
	                } else {
	                    next[_i2][_j2] = 0;
	                }
	            } else if (world[_i2][_j2] == 1) {
	                if (x < 2 || x > 3) {
	                    next[_i2][_j2] = 0;
	                } else {
	                    next[_i2][_j2] = 1;
	                }
	            }
	        }
	    }
	    for (var _i3 = 0; _i3 < tiles; _i3++) {
	        for (var _j3 = 0; _j3 < tiles; _j3++) {
	            world[_i3][_j3] = next[_i3][_j3];
	        }
	    }
	}
	var clicking = false;
	var mode = 0;
	document.getElementById("canvas").addEventListener('contextmenu', function (event) {
	    return event.preventDefault();
	});
	
	document.getElementById("canvas").onmousedown = function (e) {
	    if (looping) {
	        clearInterval(loop);
	        looping = false;
	        document.getElementById("step").textContent = "Start";
	    }
	    function fix(n) {
	        return Math.floor(n / scale);
	    }
	    var x = e.pageX - this.offsetLeft;
	    var y = e.pageY - this.offsetTop;
	    console.log(e.button);
	    if (e.button === 0) {
	        mode = 1;
	    }
	    if (e.button === 2) {
	        mode = 0;
	    }
	    world[fix(x)][fix(y)] = mode;
	    partialRender(fix(x), fix(y));
	    clicking = true;
	};
	document.onmouseup = function (e) {
	    clicking = false;
	};
	document.getElementById("canvas").onmousemove = function (e) {
	    //Update debug tooltips
	    function fix(n) {
	        n = fix2(n) + 1;
	        n = n.toString();
	        if (n.length == 1) {
	            n = "0" + n;
	        }
	        return n;
	    }
	    function fix2(n) {
	        return Math.floor(n / scale);
	    }
	    var x = e.pageX - this.offsetLeft;
	    var y = e.pageY - this.offsetTop;
	    document.getElementById("cdis").innerHTML = "[" + fix(x) + "," + fix(y) + "] :: " + neighbors(fix2(y), fix2(x));
	    x = fix2(x);
	    y = fix2(y);
	    for (var _i4 = -1; _i4 <= 1; _i4++) {
	        for (var _j4 = -1; _j4 <= 1; _j4++) {
	            dtx.beginPath();
	            dtx.rect(_j4 * 12 + 13, _i4 * 12 + 13, 11, 11);
	            dtx.fillStyle = color(check(y, x, _i4, _j4));
	            dtx.fill();
	        }
	    }
	    //Click and drag in current mode
	    if (clicking) {
	        var _fix = function _fix(n) {
	            return Math.floor(n / scale);
	        };
	
	        var x = e.pageX - this.offsetLeft;
	        var y = e.pageY - this.offsetTop;
	        world[_fix(x)][_fix(y)] = mode;
	        partialRender(_fix(x), _fix(y));
	    }
	};
	function tick() {
	    step();
	    render();
	}
	var loop = void 0;
	var looping = false;
	document.getElementById("step").onclick = function () {
	    if (looping) {
	        clearInterval(loop);
	        document.getElementById("step").textContent = "Start";
	    } else {
	        tick();
	        loop = setInterval(tick, 100);
	        document.getElementById("step").textContent = "Stop";
	    }
	    looping = !looping;
	};
	document.getElementById("clear").onclick = function () {
	    if (looping) {
	        clearInterval(loop);
	        document.getElementById("step").textContent = "Start";
	        looping = false;
	    }
	    world = [];
	    next = [];
	    for (var _i5 = 0; _i5 < tiles; _i5++) {
	        world.push([]);
	        next.push([]);
	        for (var _j5 = 0; _j5 < tiles; _j5++) {
	            world[_i5].push(0);
	            next[_i5].push(0);
	        }
	    }
	    render();
	};
	tick();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map