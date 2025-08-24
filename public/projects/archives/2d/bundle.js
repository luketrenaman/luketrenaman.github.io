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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	window.onload = function () {
	    var jammed = false;
	    var sound = new Howl({
	        src: ['assets/placeholder.mp3'],
	        loop: true
	    });
	    sound.play();
	    PIXI.Sprite.prototype.bringToFront = function () {
	        if (this.parent) {
	            var parent = this.parent;
	            parent.removeChild(this);
	            parent.addChild(this);
	        }
	    };
	    __webpack_require__(1)();
	    //friction, gravity, debug,zoom
	    var config = __webpack_require__(2);
	    var particle = __webpack_require__(3);
	    var key = __webpack_require__(5);
	    var shapes = __webpack_require__(4);
	    var fps = __webpack_require__(6);
	    var particles = __webpack_require__(3);
	    var pause = __webpack_require__(8);
	    var map = __webpack_require__(9);
	    var collide = __webpack_require__(12);
	    var grounded = __webpack_require__(13);
	    key.listen();
	    // create an new instance of a pixi stage
	    var all = new PIXI.Container();
	    var stage = new PIXI.Container();
	    var particleContainer = new PIXI.Container();
	    stage.addChild(particleContainer);
	    all.addChild(stage);
	    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	    // create a renderer instance.
	    var renderer = PIXI.autoDetectRenderer(800, 500, null, true);
	    renderer.backgroundColor = 0x18212b;
	    // add the renderer view element to the DOM
	    shapes.renderer = renderer;
	    document.body.appendChild(renderer.view);
	    // create a new Sprite using the texture
	    stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
	    stage.interactive = true;
	    PIXI.loader.add("assets/mute/mute.json").add("assets/tile.png").load(setup);
	
	    function setup() {
	        var outport = undefined;
	        //PAUSE CODE
	        var pauseScreen = new PIXI.Sprite(shapes.rectangle(renderer.width, renderer.height, "rgba(44, 62, 80,0.9)"));
	        pauseScreen.visible = false;
	        var text = new PIXI.Text("Game paused", {
	            font: "30px Pixel",
	            fill: "white"
	        });
	        text.anchor.x = 0.5;
	        text.x = renderer.width / 2;
	        text.y = 200;
	        pauseScreen.addChild(text);
	        all.addChild(pauseScreen);
	        //REST OF GAME
	        var vel = [];
	        var blocks = [];
	        PIXI.Sprite.prototype.physic = function () {
	            vel.push(this);
	            this.yvel = 0;
	            this.xvel = 0;
	        };
	        PIXI.Sprite.prototype.block = function () {
	            blocks.push(this);
	        };
	        var player = new PIXI.Sprite(shapes.rectangle(12.5, 12.5, "#70b7e6"));
	        player.physic();
	        /*
	        function rand() {
	            var str = "";
	            for (var i = 0; i < 20; i++) {
	                if (Math.random() > 0.75) {
	                    str += "#";
	                } else {
	                    str += " ";
	                }
	            }
	            return str;
	        }
	        var lv = ["   1                "];
	        for (var i = 0; i < 20; i++) {
	            lv.push(rand());
	        }
	        */
	        var lv = [[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
	        var level = map(lv, player, stage, config.debug);
	        stage.addChild(player);
	        stage.dx = 0;
	        stage.dy = 0;
	        __webpack_require__(14)(config, player, stage);
	        var zoom;
	        player.x = 130;
	        player.y = 60;
	        outport = new fps(60, function (f, obj, every) {
	            zoom = config.zoom;
	            stage.scale.x = zoom;
	            stage.scale.y = zoom;
	            collide("handle", level, config.debug);
	            particles("handle", particleContainer);
	            player.xvel *= config.friction;
	
	            key.check([65, 37], function () {
	                player.xvel -= config.speedx;
	                //Left
	            });
	            key.check([68, 39], function () {
	                player.xvel += config.speedx;
	                //Right
	            });
	            key.check([87, 38], function () {
	                if (config.misc.jetpack) {
	                    player.yvel -= config.speedy / 10;
	                    particles({
	                        "amount": 15,
	                        "x": player.width / 2 + player.x,
	                        "y": player.height + player.y,
	                        "width": 2,
	                        "height": 2,
	                        "rangex": [10, -10],
	                        "rangey": [30, -10],
	                        "colors": ["#e74c3c", "#e67e22", "#f1c40f"],
	                        "wrapper": particleContainer
	                    });
	                } else if (grounded(player, level)) {
	                    player.yvel = -config.speedy;
	                }
	                //Up
	            });
	            key.check([83, 40], function () {
	                if (config.misc.weights) {
	                    player.yvel += 0.5;
	                    player.tint = 0x000000;
	                }
	                //Down
	            }, function () {
	                if (config.misc.weights) {
	                    player.tint = 0xffffff;
	                }
	            });
	            key.check(80, function () {
	                //Pause
	            });
	            pause.handle(obj, key, pauseScreen, sound); //Handles pausing
	            //Render
	            if (player.yvel < config.terminalVelocity || !config.misc.terminal) {
	                player.yvel += config.gravity;
	            } else {
	                player.yvel = config.terminalVelocity;
	            }
	
	            function lerp(min, max, alpha) {
	                return (max - min) * alpha + min;
	            }
	            stage.dx = lerp(Math.min(stage.dx, (-player.x - player.xvel) * zoom), Math.max(stage.dx, (-player.x - player.xvel) * zoom), config["lerpAlpha"]);
	            stage.dy = lerp(Math.min(stage.dy, (-player.y - player.yvel) * zoom), Math.max(stage.dy, (-player.y - player.yvel) * zoom), config["lerpAlpha"]);
	            stage.x = Math.floor(stage.dx + renderer.width / 2);
	            stage.y = Math.floor(stage.dy + renderer.height / 2);
	
	            var steps = config.steps;
	            for (var i = 0; i < steps; i++) {
	                var old = [player.x, player.y];
	                player.x += player.xvel / steps;
	                if (collide(player, level, config.debug)) {
	                    player.x = old[0];
	                    player.y = old[1];
	                    player.xvel = 0;
	                }
	                old = [player.x, player.y];
	                player.y += player.yvel / steps;
	                if (collide(player, level, config.debug)) {
	                    player.x = old[0];
	                    player.y = old[1];
	                    player.yvel = 0;
	                }
	            }
	            renderer.render(all);
	        });
	    }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function () {
	    var keys = {};
	    window.addEventListener("keydown", function (e) {
	        keys[e.keyCode] = true;
	        switch (e.keyCode) {
	            case 37:
	            case 39:
	            case 38:
	            case 40: // Arrow keys
	            case 32:
	                e.preventDefault();
	                break; // Space
	            default:
	                break; // do not block other keys
	        }
	    }, false);
	    window.addEventListener('keyup', function (e) {
	        keys[e.keyCode] = false;
	    }, false);
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = {
		"steps": 4,
		"debug": false,
		"friction": 0.75,
		"gravity": 0.275,
		"zoom": 2,
		"lerpAlpha": .6,
		"terminalVelocity": 10,
		"speedx": 1,
		"speedy": 8,
		"misc": {
			"jetpack": false,
			"weights": false,
			"terminal": false
		}
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (obj, pc, sprite) {
	    if (obj === "handle") {
	        var particleContainer = arguments[1];
	        particleContainer.children.forEach(function (val) {
	            if (val.kill !== 0) {
	                var dx = val.obj.rangex[0] - Math.round(Math.random() * (val.obj.rangex[0] - val.obj.rangex[1]));
	                var dy = val.obj.rangey[0] - Math.round(Math.random() * (val.obj.rangey[0] - val.obj.rangey[1]));
	                val.x += dx;
	                val.y += dy;
	                val.kill--;
	                val.alpha = val.kill / val.killMax;
	            } else {
	                particleContainer.removeChild(val);
	            }
	        });
	        return;
	    }
	    var shapes = __webpack_require__(4);
	    for (var i = 0; i < obj.amount; i++) {
	        var particle = new PIXI.Sprite(shapes.rectangle(obj.width, obj.height, obj.colors[Math.floor(Math.random() * obj.colors.length)]));
	        particle.obj = obj;
	        particle.x = obj.x;
	        particle.y = obj.y;
	        particle.zOrder = 2;
	        particle.kill = 12;
	        particle.killMax = 12;
	        obj.wrapper.addChild(particle);
	    }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = new function () {
	    var a = this;
	    this.renderer = "";
	    this.canvas = function (width, height) {
	        var canvas = document.createElement('canvas');
	        canvas.width = width;
	        canvas.height = height;
	        var ctx = canvas.getContext("2d");
	        return {
	            "canvas": canvas,
	            "ctx": ctx
	        };
	    };
	    this.rectangle = function (width, height, color) {
	        var b = a.canvas(width, height);
	        b.ctx.fillStyle = color;
	        b.ctx.fillRect(0, 0, width, height);
	        return PIXI.Texture.fromCanvas(b.canvas);
	    };
	    this.circle = function (radius, color) {
	        var b = a.canvas(radius * 2, radius * 2);
	        b.ctx.fillStyle = color;
	        b.ctx.beginPath();
	        b.ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
	        b.ctx.fill();
	        return PIXI.Texture.fromCanvas(b.canvas);
	    };
	}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = new function () {
	    var a = this;
	    this.map = [];
	    this.tethers = [];
	    this.listen = function () {
	        document.onkeydown = function (e) {
	            e = e || window.event;
	            e = e.which || e.keyCode || 0;
	            if (a.map.indexOf(e) == -1) {
	                a.map.push(e);
	            }
	            a.tethers.forEach(function (tether, index) {
	                if (tether.type == "down") {
	                    if (e === tether.key) {
	                        tether.func();
	                        if (!tether.perma) a.tethers.splice(index, 1);
	                    }
	                }
	            });
	        };
	        document.onkeyup = function (e) {
	            e = e || window.event;
	            e = e.which || e.keyCode || 0;
	            // use e.keyCode
	            if (a.map.indexOf(e) != -1) {
	                a.map.splice(a.map.indexOf(e), 1);
	            }
	            a.tethers.forEach(function (tether, index) {
	                if (tether.type == "up") {
	                    if (e === tether.key) {
	                        tether.func();
	                        if (!tether.perma) a.tethers.splice(index, 1);
	                    }
	                }
	            });
	        };
	    };
	    this.check = function (key, callback, not) {
	        if ((typeof key === "undefined" ? "undefined" : _typeof(key)) != "object") {
	            key = [key];
	        }
	        for (var i = 0; i < key.length; i++) {
	            if (a.map.indexOf(key[i]) != -1) {
	                callback();
	                i = key.length;
	                return;
	            }
	        }
	        if (not !== undefined) {
	            not();
	        }
	    };
	    this.waitUp = function (key, func, perma) {
	        if (perma === undefined) {
	            perma = false;
	        }
	        a.tethers.push({
	            "key": key,
	            "func": func,
	            "type": "up",
	            "perma": perma
	        });
	    };
	    this.waitDown = function (key, func, perma) {
	        if (perma === undefined) {
	            perma = false;
	        }
	        a.tethers.push({
	            "key": key,
	            "func": func,
	            "type": "down",
	            "perma": perma
	        });
	    };
	}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (fps, cb) {
	    this.going = true;
	    this.start = function () {
	        this.going = true;
	        requestAnimationFrame(draw);
	    };
	    this.resume = this.start;
	    this.stop = function () {
	        this.going = false;
	    };
	    this.pause = this.stop;
	    this.toggle = function () {
	        this.going = !this.going;
	    };
	    this.latch = function (a) {
	        cb = __webpack_require__(7)(cb, a);
	    };
	    this.restart = function () {
	        ct = 0;
	    };
	    var a = this;
	    var now;
	    var then = Date.now();
	    var interval = 1000 / fps;
	    var delta;
	    var ct = 0;
	
	    function every(count, callback) {
	        if (ct % count == 0) {
	            callback();
	        }
	    }
	
	    function draw() {
	        if (a.going) {
	            requestAnimationFrame(draw);
	        }
	        now = Date.now();
	        delta = now - then;
	        if (delta > interval) {
	            ct++;
	            // update time stuffs
	            // Just `then = now` is not enough.
	            // Lets say we set fps at 10 which means
	            // each frame must take 100ms
	            // Now frame executes in 16ms (60fps) so
	            // the loop iterates 7 times (16*7 = 112ms) until
	            // delta > interval === true
	            // Eventually this lowers down the FPS as
	            // 112*10 = 1120ms (NOT 1000ms).
	            // So we have to get rid of that extra 12ms
	            // by subtracting delta (112) % interval (100).
	            // Hope that makes sense.
	            then = now - delta % interval;
	            cb(ct, a, every);
	        }
	    }
	    draw();
	    return this;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (a, b) {
	    return function () {
	        a.call(this, arguments);
	        b.call(this, arguments);
	    };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = new function () {
	    var a = this;
	    this.allow = true;
	    this.handle = function (obj, key, psc, sound) {
	
	        function wait() {
	            obj.start();
	            sound.volume(1);
	            psc.visible = false;
	        }
	
	        function allow() {
	            a.allow = true;
	        }
	        key.check(80, function () {
	            if (a.allow) {
	                obj.stop();
	                sound.volume(0.1);
	                psc.visible = true;
	                a.allow = false;
	                key.waitUp(80, function () {
	                    key.waitDown(80, wait);
	                    key.waitUp(80, allow);
	                });
	            }
	        });
	    };
	}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (arr, player1, stage, dbg) {
	    var shapes = __webpack_require__(4);
	    //Map size is 20 blocks tall and 32 wide
	    //0 is grass 1 is dirt
	    function getName(x, y) {
	        var types = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["-", "#", 1];
	
	        var l = types.includes(arr[y][x - 1]),
	            t = arr[y - 1] && types.includes(arr[y - 1][x]),
	            r = types.includes(arr[y][x + 1]),
	            b = arr[y + 1] && types.includes(arr[y + 1][x]),
	            tl = arr[y - 1] && types.includes(arr[y - 1][x - 1]),
	            tr = arr[y - 1] && types.includes(arr[y - 1][x + 1]),
	            br = arr[y + 1] && types.includes(arr[y + 1][x + 1]),
	            bl = arr[y + 1] && types.includes(arr[y + 1][x - 1]);
	        return [l & t ? +tl : 0, +t || 0, r & t ? +tr : 0, +l, +r, l & b ? +bl : 0, +b || 0, r & b ? +br : 0];
	    }
	    var debug = [];
	    for (var i = 0; i < arr.length; i++) {
	        debug.push([]);
	        arr[i].forEach(function (cell, j) {
	            switch (cell) {
	                case " ":
	                case 0:
	                    if (dbg) {
	                        cell = new PIXI.Sprite(__webpack_require__(10)(null, true));
	                        cell.x = j * 25;
	                        cell.y = i * 25;
	                        stage.addChild(cell);
	                    }
	                    break;
	                case "-":
	                case "#":
	                case 1:
	                    //PIXI.loader.resources["assets/tile.png"].texture
	                    var stuff = [];
	                    cell = new PIXI.Sprite(__webpack_require__(10)(getName(j, i), dbg));
	                    cell.x = j * 25;
	                    cell.y = i * 25;
	                    stage.addChild(cell);
	                    break;
	                case "p":
	                    if (dbg) {
	                        cell = new PIXI.Sprite(__webpack_require__(10)(null, true));
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
	        });
	    }
	    console.log(arr);
	    arr.debug = debug;
	    return arr;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (x, dbg) {
	    var shapes = __webpack_require__(4);
	    var lighten = __webpack_require__(11);
	    var canvas = __webpack_require__(4).canvas(25, 25);
	    var condition = false;
	    //5d2e0d
	    //228B22
	    //x,y,width,height
	    var bounds = "01112\n3   4\n3   4\n3   4\n56667".split("\n").map(function (val) {
	        return val.split("");
	    });
	    for (var i = 0; i < 25; i++) {
	        for (var j = 0; j < 25; j++) {
	            if (dbg && (i == 0 || i == 24 || j == 0 || j == 24)) {
	                canvas.ctx.fillStyle = "#000";
	            } else if (x === null) {
	                canvas.ctx.fillStyle = "#18212b";
	            } else {
	                if (x[bounds[Math.floor(j / 5)][Math.floor(i / 5)]] === 0) {
	                    //Grass
	                    canvas.ctx.fillStyle = "#" + lighten("2ecc71", Math.random() * 15 - 20);
	                } else {
	                    //Not Grass
	                    canvas.ctx.fillStyle = "#" + lighten("d35400", Math.random() * 10 - 10);
	                }
	            }
	            canvas.ctx.fillRect(i, j, 1, 1);
	        }
	    }
	    return PIXI.Texture.fromCanvas(canvas.canvas);
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (color, percent) {
			var num = parseInt(color, 16),
			    amt = Math.round(2.55 * percent),
			    R = (num >> 16) + amt,
			    B = (num >> 8 & 0x00FF) + amt,
			    G = (num & 0x0000FF) + amt;
	
			return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
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

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (object, tilemap) {
	    var left = Math.floor((object.x + 0.5) / 25);
	    var right = Math.floor((object.x + object.width - 0.5) / 25);
	    var top = Math.floor((object.y + 2) / 25);
	    var bottom = Math.floor((object.y + object.height + 2) / 25);
	    if (left < 0) left = 0;
	    if (right > tilemap[0].length) right = tilemap[0].length;
	    if (top < 0) top = 0;
	    if (bottom > tilemap.length - 1) bottom = tilemap.length - 1;
	    var collision = false;
	    for (var i = left; i <= right; i++) {
	        for (var j = top; j <= bottom; j++) {
	            var t = tilemap[j][i];
	            if (t === "-" || t === "#" || t === 1) {
	                collision = true;
	            }
	        }
	    }
	    top = Math.floor((object.y - 2) / 25);
	    if (top < 0) top = 0;
	    bottom = Math.floor((object.y + object.height - 2) / 25);
	    if (bottom > tilemap.length - 1) bottom = tilemap.length - 1;
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

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	//Otherwise known as "config GUI"
	module.exports = function (config, player, stage) {
		var buttons = {
			"float": function float() {
				player.yvel = 0;
				config.gravity = 0;
			}
		};
		var gui = new dat.GUI();
		var f1 = gui.addFolder('Config');
		f1.add(config, 'zoom').max(10).min(0.1).step(0.1);
		f1.add(config, 'gravity').max(1).min(0).step(0.01);
		f1.add(config, 'friction').max(1).min(0).step(0.01);
		f1.add(config, 'terminalVelocity');
		f1.add(config, 'speedx').max(5).min(0).step(0.1);
		f1.add(config, 'speedy').max(50).min(0).step(1);
		f1.add(config, 'lerpAlpha').min(0).max(1).step(0.01);
		f1.add(config, "steps").step(1);
		var f2 = gui.addFolder('Player');
		f2.add(player, 'x').listen();
		f2.add(player, 'y').listen();
		f2.add(player, 'xvel').listen();
		f2.add(player, 'yvel').listen();
		var f3 = gui.addFolder("Stage");
		f3.add(stage, 'x').listen();
		f3.add(stage, 'y').listen();
		f3.add(stage, 'dx').listen();
		f3.add(stage, 'dy').listen();
		var f4 = gui.addFolder('Experimental');
		f4.add(config.misc, 'jetpack');
		f4.add(config.misc, 'weights');
		f4.add(config.misc, 'terminal');
		f4.add(buttons, "float");
	};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map