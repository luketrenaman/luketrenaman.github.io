window.onload = function () {
    var shapes = require("./drawing/shapes");
    var stage = new PIXI.Container();
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(200, 800, null, true);
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    // create a new Sprite using the texture
    loop();
    var background = new PIXI.Sprite(PIXI.Texture.fromImage('https://images-na.ssl-images-amazon.com/images/I/813Bj2y8BML._SX522_.jpg'));
    background.width = renderer.width;
    background.height = renderer.height;
    stage.addChild(background);
    var unit = renderer.height / 10;
    function findInterval(fretNum) {
        returnVal = 0;
        for (var _i = 0; _i <= fretNum; _i++) {
            returnVal += unit * Math.pow(2, -_i / 12);
        }
        return returnVal - unit;
        // for 0, it returns unit
        // for 12, it returns unit/2
    }
    function nextNote(note, x) {
        //Where note is the starting note, and x is how many notes to progress
        return scale[(scale.indexOf(note) + x) % scale.length];
    }
    function findChord(note, type, extra) {
        note = note.toUpperCase();
        if (note === "" || type === "") {
            return [];
        }
        var chord = [];
        switch (type) {
            case "major":
                chord = [note, nextNote(note, 4), nextNote(note, 7)];
                break;
            case "minor":
                chord = [note, nextNote(note, 3), nextNote(note, 7)];
                break;
            case "augmented":
                chord = [note, nextNote(note, 4), nextNote(note, 8)];
                break;
            case "diminished":
                chord = [note, nextNote(note, 3), nextNote(note, 6)];
                break;
        }
        if (extra == "6") {
            chord.push(nextNote(note, 9));
        }
        if (extra == "7") {
            chord.push(nextNote(note, 10));
        }
        if (extra == "maj7") {
            chord.push(nextNote(note, 11));
        }
        return chord;
    }
    var markTexture = shapes.rectangle(5, 5, "#bdc3c7");
    var fretTexture = PIXI.Texture.fromImage('assets/gold.jpg');

    //Corresponding colors for each note
    var colors = ["#e74c3c", "#2ecc71", "#3498db", "#34495e"];

    //Scale of notes
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    //Strings on a ukulele
    var notes = ["G", "C", "E", "A"];

    //The position of the circle marks
    var circles = [5, 7, 10];

    //Widths of the strings
    var strings = [2, 4, 3, 2];

    //Frets and markings
    for (var _i2 = 0; _i2 <= 12; _i2++) {
        var fret = new PIXI.Sprite(fretTexture);
        fret.width = renderer.width;
        fret.height = 3;
        fret.y = findInterval(_i2);
        stage.addChild(fret);
        if (circles.indexOf(_i2) !== -1) {
            var mark = new PIXI.Sprite(markTexture);
            mark.y = findInterval(_i2 - 1) + (findInterval(_i2) - findInterval(_i2 - 1)) / 2;
            mark.x = renderer.width / 2;
            stage.addChild(mark);
        }
    }
    //Strings
    for (var _i3 = 0; _i3 < 4; _i3++) {
        var string = new PIXI.Sprite(shapes.rectangle(strings[_i3], renderer.height, "rgba(255,255,255,0.6)"));
        stage.addChild(string);
        string.x = _i3 * (renderer.width / 4) + renderer.width / 8;
    }
    var stuff = [];
    function draw() {
        var chord = findChord(document.getElementById("chord").value, document.getElementById("type").value, document.getElementById("extra").value);
        stuff.forEach(function (val) {
            stage.removeChild(val);
        });
        //Finger markings; ALL TOGETHER NOW
        for (i = 0; i <= 12; i++) {
            for (j = 0; j < 4; j++) {

                //Calculate what note this would be
                var note = nextNote(notes[j], i);
                if (chord.indexOf(note) !== -1) {
                    //If this is part of the chord...
                    if (i > 0) {
                        var fingerTexture = shapes.circle(10, colors[chord.indexOf(note)]);
                        var mark = new PIXI.Sprite(fingerTexture);
                        mark.y = findInterval(i - 1) + (findInterval(i) - findInterval(i - 1)) / 2 - mark.height / 2;
                    } else {
                        var fingerTexture = shapes.rectangle(50, 5, colors[chord.indexOf(note)]);
                        var mark = new PIXI.Sprite(fingerTexture);
                        mark.y = findInterval(i - 1) + (findInterval(i) - findInterval(i - 1));
                    }
                    mark.x = j * (renderer.width / 4) + renderer.width / 8 - mark.width / 2 + strings[j] / 2;
                    stage.addChild(mark);
                    stuff.push(mark);
                }
            }
        }
    }
    draw();
    document.getElementById("chord").oninput = draw;
    document.getElementById("type").onchange = draw;
    document.getElementById("extra").onchange = draw;
    function loop() {
        renderer.render(stage);
        requestAnimationFrame(loop);
    }
    var q = 0;
    var extra = ["none", "6", "7", "maj7"];
    var type = ["major", "minor", "augmented", "diminished"];
    function random() {
        document.getElementById("chord").value = scale[Math.floor(Math.random() * scale.length)];
        document.getElementById("type").value = type[Math.floor(Math.random() * type.length)];
        document.getElementById("extra").value = extra[Math.floor(Math.random() * extra.length)];
        q++;
        console.log(q);
        draw();
    }
};