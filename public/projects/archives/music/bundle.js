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
	
	//Initialize, some config variables
	var width = 800;
	var height = 600;
	var aspect = width / height;
	var scene = new THREE.Scene();
	
	//Set up the renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild(renderer.domElement);
	document.body.appendChild(document.createElement("br"));
	
	//prep audio
	var dancer = new Dancer();
	
	// Using an audio object
	var a = new Audio();
	a.src = 'assets/moon.mp3';
	dancer.load(a);
	dancer.play();
	
	//camera
	var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
	scene.add(camera);
	camera.position.set(0, 0, 165);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	//orbit controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	//particle
	var dancers = [];
	for (var i = 0; i < 1024; i++) {
	    var material = new THREE.SpriteMaterial();
	    var sprite = new THREE.Sprite(material);
	    scene.add(sprite);
	    dancers.push(sprite);
	}
	var inc = 0;
	var intensity = 1440;
	function render() {
	    var wave = dancer.getWaveform();
	    var spec = dancer.getSpectrum();
	    var avg = Math.abs(wave.reduce(function (a, b) {
	        return a + b;
	    }) / wave.length * 10000) + 30;
	    console.log(avg);
	    //I'd say this is all of the pitches
	    dancers.forEach(function (val, index) {
	        val.material = new THREE.SpriteMaterial({ color: "hsl(" + index * 0.3515625 + "," + Math.round(avg) + "%,50%)" });
	        val.position.set((index - 512) / 5, wave[index] * 30, spec[Math.floor(index / 32)] * 800);
	    });
	    renderer.render(scene, camera);
	    requestAnimationFrame(render);
	}
	render();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map