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