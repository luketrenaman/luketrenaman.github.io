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
        require("./misc/noscroll.js")();
//friction, gravity, debug,zoom
    var config = require("./config.js");
    var particle = require("./drawing/particles.js");
    var key = require("./tools/key-press.js");
    var shapes = require("./drawing/shapes.js");
    var fps = require("./tools/fps.js");
    var particles = require("./drawing/particles.js");
    var pause = require("./misc/handlePause.js");
    var map = require("./drawing/map.js");
    var collide = require("./physics/collide.js");
    var grounded = require("./physics/grounded.js");
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
           var lv = [
           [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0],
           [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
           [0,0,0,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0],
           [0,0,0,1,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0],
           [0,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
           [0,0,0,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0],
           [0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
           [0,0,0,1,0,1,1,0,0,1,1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
           [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
           [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0],
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
           ];
            let level = map(lv,player, stage, config.debug);
            stage.addChild(player);
            stage.dx = 0;
            stage.dy = 0;
            require("./tools/cfg-gui.js")(config, player,stage);
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
                            "y": player.height +player.y,
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
                        player.tint = 0x000000
                    }
                    //Down
                },function(){
                    if(config.misc.weights){
                        player.tint = 0xffffff
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
