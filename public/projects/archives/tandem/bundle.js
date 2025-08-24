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
	
	var _shapes = __webpack_require__(1);
	
	var _shapes2 = _interopRequireDefault(_shapes);
	
	var _keypress = __webpack_require__(2);
	
	var _keypress2 = _interopRequireDefault(_keypress);
	
	var _fps = __webpack_require__(3);
	
	var _fps2 = _interopRequireDefault(_fps);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var started = false;
	var notes = __webpack_require__(4);
	var notes2 = __webpack_require__(5);
	_keypress2.default.listen();
	//Create a Pixi Application
	var app = new PIXI.Application({ width: 700, height: 600 });
	var loader = new PIXI.loaders.Loader();
	var game = app.stage;
	//Add the canvas that Pixi automatically created for you to the HTML document
	function fonts() {
	  WebFont.load({
	    custom: {
	      families: ['Montserrat']
	    },
	    active: function active(e) {
	      // now start setting up your PixiJS (or canvas) stuff!
	      //setup()
	    }
	  });
	}
	document.body.appendChild(app.view);
	loader.add('assets/titlescreen.png').add('assets/overlay.png').load(fonts);
	loader.load(function (loader, resources) {
	  var title = new PIXI.Sprite(resources['assets/titlescreen.png'].texture);
	
	  game.addChild(title);
	  var stage = new PIXI.Container();
	  game.addChild(stage);
	  app.view.onmousedown = function () {
	    if (started) {
	      return;
	    }
	    started = true;
	    /*  #3498db
	    #e74c3c */
	    title.visible = false;
	
	    var score1 = 50;
	    var score2 = 50;
	    var TEXT_MARGIN = 20;
	    var score1Txt = new PIXI.Text('5306', { fontFamily: 'Montserrat', fontSize: 24, fill: 0x3498db, align: 'left' });
	    score1Txt.x = 183 + TEXT_MARGIN;
	    score1Txt.y = 508 + TEXT_MARGIN / 2;
	    var score2Txt = new PIXI.Text('2435', { fontFamily: 'Montserrat', fontSize: 24, fill: 0xe74c3c, align: 'right' });
	    score2Txt.y = 508 + TEXT_MARGIN / 2;
	
	    var totalTxt = new PIXI.Text('5306', { fontFamily: 'Montserrat', fontSize: 36, fill: 0xffffff, align: 'left' });
	    totalTxt.y = 550;
	    game.addChild(score1Txt);
	    game.addChild(score2Txt);
	    game.addChild(totalTxt);
	    //183px to 499px 316px width
	    function updateScores() {
	      score1Txt.text = Math.round(score1);
	      score2Txt.text = Math.round(score2);
	      score2Txt.x = 499 - score2Txt.width - TEXT_MARGIN;
	      totalTxt.text = Math.round(score1 + score2);
	      totalTxt.x = 183 + 316 / 2 - totalTxt.width / 2;
	    }
	    document.onmousedown = null;
	    var dancer = new Dancer();
	
	    // Using an audio object
	    var a = new Audio();
	    a.src = 'assets/test.mp3';
	
	    dancer.load(a);
	    dancer.play();
	    var noteContainer = new PIXI.Container();
	    var playerContainer = new PIXI.Container();
	
	    var bar = new PIXI.Sprite(_shapes2.default.rectangle(700, 4, "#ffffff"));
	    bar.alpha = 0.7;
	    playerContainer.addChild(bar);
	
	    bar.y = 504;
	
	    var blob = new PIXI.Sprite(_shapes2.default.rectangle(700, 96, "#000000"));
	    blob.alpha = 0.9;
	    playerContainer.addChild(blob);
	    blob.y = 508;
	    stage.addChild(noteContainer);
	    stage.addChild(playerContainer);
	    function map(val) {
	      switch (val) {
	        case "C4":
	          return 1;
	          break;
	        case "C#4":
	          return 2;
	          break;
	        case "D4":
	          return 3;
	          break;
	        case "D#4":
	          return 4;
	          break;
	        case "E4":
	          return 5;
	          break;
	      }
	    }
	    notes = notes.map(function (val) {
	      return [val.duration * 8, map(val.name)];
	    });
	    notes2 = notes2.map(function (val) {
	      return [val.duration * 8, map(val.name)];
	    });
	    //for player 1
	    var increment = 0;
	    var player1 = new PIXI.Sprite(_shapes2.default.rectangle(21, 22, "#3498db"));
	    for (var i = 0; i < 3; i++) {
	      for (var _j = 0; _j < 2; _j++) {
	        var line = new PIXI.Sprite(_shapes2.default.rectangle(3, 600, "#bdc3c7"));
	        line.x = 60 + _j * 24 + i * 48;
	        playerContainer.addChild(line);
	      }
	    }
	    player1.x = 63;
	    player1.y = 482;
	    playerContainer.addChild(player1);
	    _keypress2.default.waitDown(65, function () {
	      player1.x = 63;
	    }, true);
	    _keypress2.default.waitDown(83, function () {
	      player1.x = 86 + 1;
	    }, true);
	    _keypress2.default.waitDown(68, function () {
	      player1.x = 86 + 24 + 1;
	    }, true);
	    _keypress2.default.waitDown(70, function () {
	      player1.x = 86 + 24 * 2 + 1;
	    }, true);
	    _keypress2.default.waitDown(71, function () {
	      player1.x = 86 + 24 * 3 + 1;
	    }, true);
	
	    //for player 2
	    var increment2 = 0;
	    var player2 = new PIXI.Sprite(_shapes2.default.rectangle(21, 22, "#e74c3c"));
	
	    for (var _i = 0; _i < 3; _i++) {
	      for (var _j2 = 0; _j2 < 2; _j2++) {
	        var _line = new PIXI.Sprite(_shapes2.default.rectangle(3, 600, "#bdc3c7"));
	        _line.x = 500 + _j2 * 24 + _i * 48;
	        playerContainer.addChild(_line);
	      }
	    }
	    player2.x = 63 + 440;
	    player2.y = 482;
	    playerContainer.addChild(player2);
	    _keypress2.default.waitDown(74, function () {
	      player2.x = 63 + 440;
	    }, true);
	    _keypress2.default.waitDown(75, function () {
	      player2.x = 86 + 1 + 440;
	    }, true);
	    _keypress2.default.waitDown(76, function () {
	      player2.x = 86 + 24 + 1 + 440;
	    }, true);
	    _keypress2.default.waitDown(186, function () {
	      player2.x = 86 + 24 * 2 + 1 + 440;
	    }, true);
	    _keypress2.default.waitDown(222, function () {
	      player2.x = 86 + 24 * 3 + 1 + 440;
	    }, true);
	
	    var oldt = 7.5 / 2 * 64 * dancer.getTime();
	    var newt = 7.5 / 2 * 64 * dancer.getTime();
	    var delta = 0;
	    var loop = new _fps2.default(function (count, loop) {
	      updateScores();
	      stage.y = 7.5 / 2 * 64 * dancer.getTime();
	      newt = 7.5 / 2 * 64 * dancer.getTime();
	      delta = newt - oldt;
	      oldt = 7.5 / 2 * 64 * dancer.getTime();
	      playerContainer.y = -(7.5 / 2 * 64) * dancer.getTime();
	      noteContainer.children.forEach(function (val) {
	        val.visible = !(val.y + stage.y > 600 || val.y + val.height + stage.y < 0);
	        if ((val.x === player1.x || val.x === player2.x) && (val.y < player1.y + player1.height + playerContainer.y && val.height + val.y > player1.y + playerContainer.y || val.y < player2.y + player2.height + playerContainer.y && val.height + val.y > player2.y + playerContainer.y) && !val.triggered) {
	          val.texture = _shapes2.default.rectangle(21, val.height, "#2ecc71");
	          val.triggered = true;
	          if (val.x === player1.x) {
	            score1 += 500;
	          }
	          if (val.x === player2.x) {
	            score2 += 500;
	          }
	        } else if (val.y > 600 && val.triggered === false) {
	          val.texture = _shapes2.default.rectangle(21, val.height, "#e74c3c");
	          val.triggered = true;
	        }
	        if ((val.x === player1.x || val.x === player2.x) && (val.y < player1.y + player1.height + playerContainer.y && val.height + val.y > player1.y + playerContainer.y || val.y < player2.y + player2.height + playerContainer.y && val.height + val.y > player2.y + playerContainer.y)) {
	          if (val.x === player1.x) {
	            score1 += delta;
	          }
	          if (val.x === player2.x) {
	            score2 += delta;
	          }
	        }
	      });
	    }, dancer);
	    var j = 0;
	    for (var _i2 = 0; _i2 < notes.length; _i2++) {
	      var note = new PIXI.Sprite(_shapes2.default.rectangle(21, notes[_i2][0] * 30, "#ffffff"));
	      note.y = increment * -240 + 500 - notes[_i2][0] * 30 - 240;
	      note.x = 39 + notes[_i2][1] * 24;
	      noteContainer.addChild(note);
	      dancer.onceAt(increment, function () {});
	      increment += notes[_i2][0] / 8;
	    }
	    for (var _i3 = 0; _i3 < notes2.length; _i3++) {
	      var note2 = new PIXI.Sprite(_shapes2.default.rectangle(21, notes2[_i3][0] * 30, "#ffffff"));
	      note2.y = increment2 * -240 + 500 - notes2[_i3][0] * 30 - 240;
	      note2.x = 39 + 440 + notes2[_i3][1] * 24;
	      noteContainer.addChild(note2);
	      dancer.onceAt(increment, function () {});
	      increment2 += notes2[_i3][0] / 8;
	    }
	    var overlay = new PIXI.Sprite(resources['assets/overlay.png'].texture);
	    game.addChild(overlay);
	  };
	});

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = new function () {
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
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (cb) {
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
	    this.restart = function () {
	        ct = 0;
	    };
	    var a = this;
	    var ct = 0;
	
	    function draw() {
	        if (a.going) {
	            requestAnimationFrame(draw);
	            ct++;
	            cb(ct, a);
	            ct %= 64;
	        }
	    }
	    draw();
	    return this;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = [{ name: "C4", midi: 60, time: 0, velocity: .7716535433070866, duration: 2 }, { name: "C#4", midi: 61, time: 2, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 3, velocity: .7716535433070866, duration: 1 }, { name: "D#4", midi: 63, time: 4, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 4.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 5, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 6, velocity: .7716535433070866, duration: 1 }, { name: "C#4", midi: 61, time: 7, velocity: .7716535433070866, duration: 1 }, { name: "C4", midi: 60, time: 8, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 8.5, velocity: .7716535433070866, duration: 1.5 }, { name: "D#4", midi: 63, time: 10, velocity: .7716535433070866, duration: .25 }, { name: "D4", midi: 62, time: 10.25, velocity: .7716535433070866, duration: .25 }, { name: "C#4", midi: 61, time: 10.5, velocity: .7716535433070866, duration: .25 }, { name: "C4", midi: 60, time: 10.75, velocity: .7716535433070866, duration: .25 }, { name: "C#4", midi: 61, time: 11, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 12, velocity: .7716535433070866, duration: 1 }, { name: "D#4", midi: 63, time: 13, velocity: .7716535433070866, duration: 1 }, { name: "E4", midi: 64, time: 14, velocity: .7716535433070866, duration: 1 }, { name: "D#4", midi: 63, time: 15, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 15.5, velocity: .7716535433070866, duration: 2 }, { name: "E4", midi: 64, time: 17.5, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 18, velocity: .7716535433070866, duration: 2 }, { name: "D#4", midi: 63, time: 20, velocity: .7716535433070866, duration: 1 }, { name: "E4", midi: 64, time: 21, velocity: .7716535433070866, duration: 1 }, { name: "D#4", midi: 63, time: 22, velocity: .7716535433070866, duration: .125 }, { name: "E4", midi: 64, time: 22.125, velocity: .7716535433070866, duration: .125 }, { name: "D#4", midi: 63, time: 22.25, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 22.75, velocity: .7716535433070866, duration: .75 }, { name: "D4", midi: 62, time: 23.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 24, velocity: .7716535433070866, duration: 1 }, { name: "E4", midi: 64, time: 25, velocity: .7716535433070866, duration: .5 }, { name: "C4", midi: 60, time: 25.5, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 26, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 26.5, velocity: .7716535433070866, duration: 1 }, { name: "C4", midi: 60, time: 27.5, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 28, velocity: .7716535433070866, duration: 1 }, { name: "E4", midi: 64, time: 29, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 30, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 30.5, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 31, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 31.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 32, velocity: .7716535433070866, duration: .375 }, { name: "D4", midi: 62, time: 32.375, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 32.875, velocity: .7716535433070866, duration: .5 }, { name: "C4", midi: 60, time: 33.375, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 33.875, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 34.375, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 34.875, velocity: .7716535433070866, duration: .5 }, { name: "C4", midi: 60, time: 35.375, velocity: .7716535433070866, duration: .625 }, { name: "D4", midi: 62, time: 36, velocity: .7716535433070866, duration: 2 }, { name: "D#4", midi: 63, time: 38, velocity: .7716535433070866, duration: 1 }, { name: "E4", midi: 64, time: 39, velocity: .7716535433070866, duration: 1 }, { name: "D#4", midi: 63, time: 40, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 40.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 41, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 42, velocity: .7716535433070866, duration: 1 }, { name: "C#4", midi: 61, time: 43, velocity: .7716535433070866, duration: 1 }, { name: "C4", midi: 60, time: 44, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 44.5, velocity: .7716535433070866, duration: 1.5 }, { name: "D#4", midi: 63, time: 46, velocity: .7716535433070866, duration: .125 }, { name: "D4", midi: 62, time: 46.125, velocity: .7716535433070866, duration: .125 }, { name: "C#4", midi: 61, time: 46.25, velocity: .7716535433070866, duration: .125 }, { name: "C4", midi: 60, time: 46.375, velocity: .7716535433070866, duration: .125 }, { name: "D#4", midi: 63, time: 46.5, velocity: .7716535433070866, duration: .125 }, { name: "D4", midi: 62, time: 46.625, velocity: .7716535433070866, duration: .125 }, { name: "C#4", midi: 61, time: 46.75, velocity: .7716535433070866, duration: .125 }, { name: "C4", midi: 60, time: 46.875, velocity: .7716535433070866, duration: .125 }, { name: "C#4", midi: 61, time: 47, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 48, velocity: .7716535433070866, duration: .5 }, { name: "C4", midi: 60, time: 48.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 49, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 49.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 50, velocity: .7716535433070866, duration: .5 }, { name: "C4", midi: 60, time: 50.5, velocity: .7716535433070866, duration: .5 }, { name: "C#4", midi: 61, time: 51, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 51.5, velocity: .7716535433070866, duration: .5 }, { name: "D#4", midi: 63, time: 52, velocity: .7716535433070866, duration: .5 }, { name: "E4", midi: 64, time: 52.5, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 53, velocity: .7716535433070866, duration: 1.25 }, { name: "E4", midi: 64, time: 54.25, velocity: .7716535433070866, duration: .25 }, { name: "D#4", midi: 63, time: 54.5, velocity: .7716535433070866, duration: .25 }, { name: "D4", midi: 62, time: 54.75, velocity: .7716535433070866, duration: .25 }, { name: "C#4", midi: 61, time: 55, velocity: .7716535433070866, duration: .125 }, { name: "C4", midi: 60, time: 55.125, velocity: .7716535433070866, duration: .25 }, { name: "E4", midi: 64, time: 55.375, velocity: .7716535433070866, duration: .25 }, { name: "D#4", midi: 63, time: 55.625, velocity: .7716535433070866, duration: .25 }, { name: "D4", midi: 62, time: 55.875, velocity: .7716535433070866, duration: .125 }, { name: "C#4", midi: 61, time: 56, velocity: .7716535433070866, duration: .25 }, { name: "C4", midi: 60, time: 56.25, velocity: .7716535433070866, duration: .25 }, { name: "E4", midi: 64, time: 56.5, velocity: .7716535433070866, duration: .25 }, { name: "D#4", midi: 63, time: 56.75, velocity: .7716535433070866, duration: .125 }, { name: "D4", midi: 62, time: 56.875, velocity: .7716535433070866, duration: .25 }, { name: "C#4", midi: 61, time: 57.125, velocity: .7716535433070866, duration: .25 }, { name: "C4", midi: 60, time: 57.375, velocity: .7716535433070866, duration: .25 }, { name: "E4", midi: 64, time: 57.625, velocity: .7716535433070866, duration: .125 }, { name: "D#4", midi: 63, time: 57.75, velocity: .7716535433070866, duration: .25 }, { name: "C4", midi: 60, time: 58, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 59, velocity: .7716535433070866, duration: 1 }, { name: "C#4", midi: 61, time: 60, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 60.5, velocity: .7874015748031497, duration: .5 }, { name: "E4", midi: 64, time: 61, velocity: .7874015748031497, duration: .5 }, { name: "D4", midi: 62, time: 61.5, velocity: .7874015748031497, duration: .5 }, { name: "C4", midi: 60, time: 62, velocity: .7874015748031497, duration: .75 }, { name: "C#4", midi: 61, time: 62.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 62.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 63, velocity: .7874015748031497, duration: 1 }, { name: "C#4", midi: 61, time: 64, velocity: .7874015748031497, duration: 2 }, { name: "D4", midi: 62, time: 66, velocity: .7874015748031497, duration: 1 }, { name: "D#4", midi: 63, time: 67, velocity: .7874015748031497, duration: 1 }, { name: "E4", midi: 64, time: 68, velocity: .7874015748031497, duration: 1 }, { name: "C#4", midi: 61, time: 69, velocity: .7874015748031497, duration: 2 }, { name: "D4", midi: 62, time: 71, velocity: .7874015748031497, duration: .5 }, { name: "D#4", midi: 63, time: 71.5, velocity: .7874015748031497, duration: .5 }, { name: "C4", midi: 60, time: 72, velocity: .7874015748031497, duration: 2 }, { name: "D4", midi: 62, time: 74, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 74.125, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 74.25, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 74.375, velocity: .7874015748031497, duration: .625 }, { name: "E4", midi: 64, time: 75, velocity: .7874015748031497, duration: 1 }, { name: "D4", midi: 62, time: 76, velocity: .7874015748031497, duration: .5 }, { name: "C#4", midi: 61, time: 76.5, velocity: .7874015748031497, duration: 1.5 }, { name: "C4", midi: 60, time: 78, velocity: .7716535433070866, duration: 1 }, { name: "D4", midi: 62, time: 79, velocity: .7716535433070866, duration: 1 }, { name: "C#4", midi: 61, time: 80, velocity: .7716535433070866, duration: .5 }, { name: "D4", midi: 62, time: 80.5, velocity: .7874015748031497, duration: .5 }, { name: "E4", midi: 64, time: 81, velocity: .7874015748031497, duration: .5 }, { name: "D4", midi: 62, time: 81.5, velocity: .7874015748031497, duration: .5 }, { name: "C4", midi: 60, time: 82, velocity: .7874015748031497, duration: .75 }, { name: "C#4", midi: 61, time: 82.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 82.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 83, velocity: .7874015748031497, duration: 1 }, { name: "C#4", midi: 61, time: 84, velocity: .7874015748031497, duration: 2 }, { name: "D4", midi: 62, time: 86, velocity: .7874015748031497, duration: 1 }, { name: "D#4", midi: 63, time: 87, velocity: .7874015748031497, duration: 1 }, { name: "E4", midi: 64, time: 88, velocity: .7874015748031497, duration: 1 }, { name: "D#4", midi: 63, time: 89, velocity: .7874015748031497, duration: 1 }, { name: "D4", midi: 62, time: 90, velocity: .7874015748031497, duration: 4 }];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = [{ name: "C4", midi: 60, time: 0, velocity: .7874015748031497, duration: 6 }, { name: "D4", midi: 62, time: 6, velocity: .7874015748031497, duration: 6 }, { name: "D#4", midi: 63, time: 12, velocity: .7874015748031497, duration: 6 }, { name: "C#4", midi: 61, time: 18, velocity: .7874015748031497, duration: 6 }, { name: "D4", midi: 62, time: 24, velocity: .7874015748031497, duration: 6 }, { name: "C4", midi: 60, time: 30, velocity: .7874015748031497, duration: 4 }, { name: "D4", midi: 62, time: 34, velocity: .7874015748031497, duration: .5 }, { name: "E4", midi: 64, time: 34.5, velocity: .7874015748031497, duration: .5 }, { name: "D4", midi: 62, time: 35, velocity: .7874015748031497, duration: .5 }, { name: "E4", midi: 64, time: 35.5, velocity: .7874015748031497, duration: .5 }, { name: "C4", midi: 60, time: 36, velocity: .7874015748031497, duration: 1.5 }, { name: "D4", midi: 62, time: 37.5, velocity: .7874015748031497, duration: 1.5 }, { name: "C4", midi: 60, time: 39, velocity: .7874015748031497, duration: 1.5 }, { name: "D4", midi: 62, time: 40.5, velocity: .7874015748031497, duration: 1.5 }, { name: "C#4", midi: 61, time: 42, velocity: .7874015748031497, duration: 1.5 }, { name: "D#4", midi: 63, time: 43.5, velocity: .7874015748031497, duration: 1.5 }, { name: "C#4", midi: 61, time: 45, velocity: .7874015748031497, duration: 1.5 }, { name: "D#4", midi: 63, time: 46.5, velocity: .7874015748031497, duration: 1.5 }, { name: "C4", midi: 60, time: 48, velocity: .7874015748031497, duration: 1 }, { name: "C#4", midi: 61, time: 49, velocity: .7874015748031497, duration: 1 }, { name: "D4", midi: 62, time: 50, velocity: .7874015748031497, duration: 1 }, { name: "D#4", midi: 63, time: 51, velocity: .7874015748031497, duration: 1 }, { name: "E4", midi: 64, time: 52, velocity: .7874015748031497, duration: 1 }, { name: "D#4", midi: 63, time: 53, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 53.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 53.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 53.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 53.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 53.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 53.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 53.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 54, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 54.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 54.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 54.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 54.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 54.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 54.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 54.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 55, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 55.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 55.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 55.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 55.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 55.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 55.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 55.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 56, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 56.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 56.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 56.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 56.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 56.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 56.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 56.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 57, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 57.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 57.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 57.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 57.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 57.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 57.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 57.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 58, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 58.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 58.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 58.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 58.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 58.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 58.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 58.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 59, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 59.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 59.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 59.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 59.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 59.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 59.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 59.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 60, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 60.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 60.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 60.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 60.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 60.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 60.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 60.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 61, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 61.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 61.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 61.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 61.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 61.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 61.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 61.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 62, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 62.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 62.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 62.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 62.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 62.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 62.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 62.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 63, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 63.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 63.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 63.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 63.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 63.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 63.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 63.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 64, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 64.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 64.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 64.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 64.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 64.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 64.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 64.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 65, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 65.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 65.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 65.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 65.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 65.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 65.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 65.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 66, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 66.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 66.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 66.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 66.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 66.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 66.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 66.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 67, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 67.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 67.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 67.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 67.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 67.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 67.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 67.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 68, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 68.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 68.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 68.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 68.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 68.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 68.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 68.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 69, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 69.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 69.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 69.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 69.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 69.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 69.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 69.875, velocity: .7874015748031497, duration: 2.125 }, { name: "C4", midi: 60, time: 72, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 72.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 72.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 72.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 72.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 72.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 72.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 72.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 73, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 73.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 73.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 73.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 73.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 73.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 73.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 73.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 74, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 74.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 74.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 74.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 74.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 74.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 74.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 74.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 75.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 75.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 75.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 75.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 75.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 75.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 75.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 76, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 76.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 76.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 76.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 76.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 76.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 76.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 76.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 77, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 77.125, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 77.25, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 77.375, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 77.5, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 77.625, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 77.75, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 77.875, velocity: .7874015748031497, duration: .5 }, { name: "E4", midi: 64, time: 78.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 78.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 78.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 78.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 78.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 79, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 79.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 79.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 79.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 79.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 79.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 79.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 79.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 80, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 80.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 80.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 80.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 80.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 80.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 80.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 80.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 81, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 81.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 81.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 81.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 81.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 81.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 81.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 81.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 82, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 82.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 82.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 82.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 82.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 82.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 82.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 82.875, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 83, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 83.125, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 83.25, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 83.375, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 83.5, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 83.625, velocity: .7874015748031497, duration: .125 }, { name: "D#4", midi: 63, time: 83.75, velocity: .7874015748031497, duration: .125 }, { name: "E4", midi: 64, time: 83.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 84, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 84.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 84.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 84.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 84.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 84.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 84.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 84.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 85, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 85.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 85.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 85.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 85.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 85.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 85.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 85.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 86, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 86.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 86.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 86.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 86.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 86.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 86.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 86.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 87, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 87.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 87.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 87.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 87.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 87.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 87.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 87.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 88, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 88.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 88.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 88.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 88.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 88.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 88.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 88.875, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 89, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 89.125, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 89.25, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 89.375, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 89.5, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 89.625, velocity: .7874015748031497, duration: .125 }, { name: "C#4", midi: 61, time: 89.75, velocity: .7874015748031497, duration: .125 }, { name: "D4", midi: 62, time: 89.875, velocity: .7874015748031497, duration: .125 }, { name: "C4", midi: 60, time: 90, velocity: .7874015748031497, duration: 4 }];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map