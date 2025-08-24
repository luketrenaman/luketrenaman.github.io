import shapes from "./drawing/shapes.js";
import key from "./utilities/keypress.js";
import fps from "./utilities/fps.js";
let started = false;
let notes = require("./resources/notes1.js");
let notes2 = require("./resources/notes2.js");
key.listen();
 //Create a Pixi Application
let app = new PIXI.Application({width: 700, height: 600});
const loader = new PIXI.loaders.Loader();
let game = app.stage;
//Add the canvas that Pixi automatically created for you to the HTML document
function fonts(){
  WebFont.load({
      custom: {
          families: ['Montserrat']
      },
      active:e=>{
          // now start setting up your PixiJS (or canvas) stuff!
          //setup()
      }
  })
}
document.body.appendChild(app.view);
loader.add('assets/titlescreen.png')
.add('assets/overlay.png')
.load(fonts);
loader.load((loader,resources) => {
  let title = new PIXI.Sprite(resources['assets/titlescreen.png'].texture);

  game.addChild(title);
let stage = new PIXI.Container();
game.addChild(stage);
 app.view.onmousedown = function(){
   if(started){
     return;
   }
   started = true;
   /*  #3498db
  #e74c3c */
  title.visible = false;

  let score1 = 50;
  let score2 = 50;
   const TEXT_MARGIN = 20;
   let score1Txt = new PIXI.Text('5306',{fontFamily : 'Montserrat', fontSize: 24, fill : 0x3498db, align : 'left'});
   score1Txt.x = 183+TEXT_MARGIN;
   score1Txt.y = 508+TEXT_MARGIN/2;
   let score2Txt = new PIXI.Text('2435',{fontFamily : 'Montserrat', fontSize: 24, fill : 0xe74c3c, align : 'right'});
   score2Txt.y = 508+TEXT_MARGIN/2;

   let totalTxt = new PIXI.Text('5306',{fontFamily : 'Montserrat', fontSize: 36, fill : 0xffffff, align : 'left'});
   totalTxt.y = 550
   game.addChild(score1Txt);
   game.addChild(score2Txt);
   game.addChild(totalTxt);
   //183px to 499px 316px width
   function updateScores(){
     score1Txt.text = Math.round(score1);
     score2Txt.text = Math.round(score2);
     score2Txt.x = 499-score2Txt.width-TEXT_MARGIN;
     totalTxt.text = Math.round(score1+score2);
     totalTxt.x = 183+316/2-totalTxt.width/2
   }
  document.onmousedown = null;
 var dancer = new Dancer();

  // Using an audio object
  var a = new Audio();
  a.src = 'assets/test.mp3';

  dancer.load( a );
  dancer.play();
  let noteContainer = new PIXI.Container();
  let playerContainer = new PIXI.Container();

  let bar = new PIXI.Sprite(shapes.rectangle(700,4,"#ffffff"))
  bar.alpha = 0.7;
  playerContainer.addChild(bar);

  bar.y = 504;

  let blob = new PIXI.Sprite(shapes.rectangle(700,96,"#000000"))
  blob.alpha = 0.9
  playerContainer.addChild(blob);
  blob.y = 508;
  stage.addChild(noteContainer);
  stage.addChild(playerContainer);
  function map(val){
    switch(val){
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
  notes = notes.map(function(val){
    return [val.duration*8,map(val.name)]
  });
  notes2 = notes2.map(function(val){
    return [val.duration*8,map(val.name)]
  });
  //for player 1
  let increment = 0;
  let player1 = new PIXI.Sprite(shapes.rectangle(21,22,"#3498db"))
  for(let i = 0;i < 3;i++){
    for(let j=0;j<2;j++){
      let line = new PIXI.Sprite(shapes.rectangle(3,600,"#bdc3c7"))
      line.x = 60+j*24+i*48;
      playerContainer.addChild(line)
    }
  }
  player1.x = 63;
  player1.y = 482;
  playerContainer.addChild(player1);
    key.waitDown(65,function(){
    player1.x = 63
  },true)
  key.waitDown(83,function(){
    player1.x = 86+1
  },true)
  key.waitDown(68,function(){
    player1.x = 86+24+1 
  },true)
  key.waitDown(70,function(){
    player1.x = 86+24*2+1
  },true)
  key.waitDown(71,function(){
    player1.x = 86+24*3+1
  },true)

  //for player 2
  let increment2 = 0;
  let player2 = new PIXI.Sprite(shapes.rectangle(21,22,"#e74c3c"))

    for(let i = 0;i < 3;i++){
    for(let j=0;j<2;j++){
      let line = new PIXI.Sprite(shapes.rectangle(3,600,"#bdc3c7"))
      line.x = 500+j*24+i*48;
      playerContainer.addChild(line)
    }
  }
  player2.x = 63+440;
  player2.y = 482;
  playerContainer.addChild(player2);
    key.waitDown(74,function(){
    player2.x = 63+440
  },true)
  key.waitDown(75,function(){
    player2.x = 86+1+440
  },true)
  key.waitDown(76,function(){
    player2.x = 86+24+1+440
  },true)
  key.waitDown(186,function(){
    player2.x = 86+24*2+1+440
  },true)
  key.waitDown(222,function(){
    player2.x = 86+24*3+1+440
  },true)

  let oldt = (7.5/2 * 64)*dancer.getTime();
  let newt = (7.5/2 * 64)*dancer.getTime();
  let delta = 0;
  let loop = new fps(function(count,loop){
    updateScores()
    stage.y = (7.5/2 * 64)*dancer.getTime();
    newt = (7.5/2 * 64)*dancer.getTime();
    delta = newt - oldt;
    oldt = (7.5/2 * 64)*dancer.getTime();
    playerContainer.y = -(7.5/2 * 64)*dancer.getTime();
    noteContainer.children.forEach(function(val){
      val.visible = !(val.y+stage.y> 600 || val.y + val.height + stage.y < 0)
        if((val.x === player1.x || val.x === player2.x) && ((val.y < player1.y + player1.height + playerContainer.y && val.height + val.y > player1.y  + playerContainer.y) || (val.y < player2.y + player2.height  + playerContainer.y && val.height + val.y > player2.y  + playerContainer.y)) && !val.triggered){
          val.texture = shapes.rectangle(21,val.height,"#2ecc71")
          val.triggered = true;
          if(val.x === player1.x){
            score1 += 500;
          }
          if(val.x === player2.x){
            score2 += 500;
          }
        } else if(val.y > 600 && val.triggered === false){
          val.texture = shapes.rectangle(21,val.height,"#e74c3c");
          val.triggered = true;
        }
        if((val.x === player1.x || val.x === player2.x) && ((val.y < player1.y + player1.height + playerContainer.y && val.height + val.y > player1.y  + playerContainer.y) || (val.y < player2.y + player2.height  + playerContainer.y && val.height + val.y > player2.y  + playerContainer.y))){
          if(val.x === player1.x){
            score1 += delta;
          }
          if(val.x === player2.x){
            score2 += delta;
          }
        }
      })
    },dancer);
  let j = 0;
  for(let i =0;i < notes.length;i++){
    let note = new PIXI.Sprite(shapes.rectangle(21,notes[i][0]*30,"#ffffff"));
    note.y = increment*-240+500-notes[i][0]*30-240;
    note.x = 39 + notes[i][1]*24;
    noteContainer.addChild(note);
    dancer.onceAt(increment,function(){});
    increment+= notes[i][0]/8;
  }
  for(let i = 0;i < notes2.length;i++){
    let note2 = new PIXI.Sprite(shapes.rectangle(21,notes2[i][0]*30,"#ffffff"));
    note2.y = increment2*-240+500-notes2[i][0]*30-240;
    note2.x = 39+440 + notes2[i][1]*24;
    noteContainer.addChild(note2);
    dancer.onceAt(increment,function(){});
    increment2+= notes2[i][0]/8;
  }
  let overlay = new PIXI.Sprite(resources['assets/overlay.png'].texture);
  game.addChild(overlay);

}
})