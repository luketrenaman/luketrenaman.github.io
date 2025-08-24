const WIDTH = 20;
const atlas = {
    "1":[0,0],
    "2":[0,1],
    "3":[0,2],
    "4":[0,3],
    "5":[1,0],
    "6":[1,1],
    "7":[1,2],
    "8":[1,3],
    "0":[2,0],
    "unclicked":[3,0],
    "wrongflag":[2,3],
    "flag":[3,1],
    "redmine":[3,2],
    "mine":[3,3],
}
class Minesweeper{
    random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    constructor(r,c,m){
        this.rows = r;
        this.columns = c;
        this.minesAmount = m;
        this.movesLeft = r*c-m;
        this.flagsLeft = m;
        this.isFirstMove = true;
        this.t = 0;
        //Create a canvas, tie it to Minesweeper instance
        this.timeTracker = document.getElementById("time");
        this.timeTracker.innerHTML = "000";
        this.flagsTracker = document.getElementById("mines");
        this.flagsTracker.innerHTML = this.flagsLeft;
        let canvas = document.createElement('canvas');
        this.canvas = canvas;
        canvas.id = "game";
        canvas.width = c*WIDTH;
        canvas.height = r*WIDTH;
        //Set indicator bar width to be canvas width
        document.getElementById("indicator-bar").style.width = c*WIDTH +"px";
        document.getElementById("indicator-bar").style.visibility = "visible";
        canvas.onclick = this.reveal.bind(this);
        canvas.oncontextmenu = this.flag.bind(this);
        let gameArea = document.getElementById("game");
        gameArea.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        //2D mines array
        this.mines = [];
        this.visited = [];
        this.flags = [];
        for(let i = 0;i<r;i++){
            this.mines.push([]);
            this.visited.push([]);
            this.flags.push([]);
            for(let j = 0;j<c;j++){
                this.mines[i].push(false);
                this.visited[i].push(false);
                this.flags[i].push(false);
            }
        }
        //Ties spritesheet to Minesweeper class, although it does not need to be reloaded on each run
        this.spritesheet = new Image();
        this.spritesheet.src = 'spritesheet.png';
        this.spritesheet.onload = this.render.bind(this);
    }
    firstClick(rClick,cClick){
        //generate m mines after user's first interaction
        while(this.minesAmount > 0){
            let rRow = this.random(0,this.rows-1);
            let rCol = this.random(0,this.columns-1);
            if(!this.mines[rRow][rCol] && !(Math.abs(rRow-rClick) <= 1 && Math.abs(rCol-cClick) <= 1)){
                //No mine here
                this.mines[rRow][rCol] = true;
                this.minesAmount--;
            }
        }
        this.timer = setInterval(() => {
            this.t++;
            let st = this.t.toString();
            this.timeTracker.innerHTML = "0".repeat(3-st.length) + st;
        },1000);
    }
    drawSprite(r,c,name){
        let loc = atlas[name];
        this.ctx.drawImage(this.spritesheet,loc[1]*WIDTH,loc[0]*WIDTH,WIDTH,WIDTH
            ,c*WIDTH,r*WIDTH,WIDTH,WIDTH);
    }
    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let r = Math.floor(y/WIDTH);
        let c = Math.floor(x/WIDTH);
        return [r,c];
    }
    adj(r,c){
        if(r >= 0 && r < this.rows && c >= 0 && c < this.columns){
            return this.mines[r][c];
        }
        return 0;
    }
    //Mark tile as visited, so long as there is no mine
    //Return whether there is a mine at this location
    visit(r,c){
        if(!(r >= 0 && r < this.rows && c >= 0 && c < this.columns)){
            return;
        }
        if(!this.visited[r][c] && !this.mines[r][c]){
            if(this.isFirstMove){
                //Our first move
                this.firstClick(r,c);
                this.isFirstMove = false;
            }
            this.visited[r][c] = true;
            //TODO: switch to method implementation
            if(this.flags[r][c]){
                this.flags[r][c] = false;
                this.flagsLeft++;
                this.flagsTracker.innerHTML = this.flagsLeft;
            }
            this.movesLeft--;
            //Calculate the number of adjacent mines
            let adj = 0;
            for(let i = -1;i<=1;i++){
                for(let j = -1;j<=1;j++){
                    if(!(i === 0 && j === 0)){
                        adj += this.adj(r+i,c+j);
                    }
                }
            }
            if(adj === 0){
                //Recursively visit
                for(let i = -1;i<=1;i++){
                    for(let j = -1;j<=1;j++){
                        if(!(i === 0 && j === 0)){
                            this.visit(r+i,c+j);
                        }
                    }
                }
            }
            this.drawSprite(r,c,adj.toString());

        }
    }
    endGame(didWin){
        let body = document.getElementsByTagName("body")[0];
        let message;
        if(didWin){
            message = "You won!";
        } else{
            message = "You lost!";
        }
        this.status = document.createElement("p");
        this.status.innerHTML = message;
        body.appendChild(this.status);
        this.canvas.onclick = undefined;
        this.canvas.oncontextmenu;
        clearInterval(this.timer);


    }
    reveal(e){
        let pos = this.getCursorPosition(this.canvas,e);
        //Left clicks with ctrl should flag mines
        if(e.ctrlKey){
            this.flag(e);
            return;
        }
        let r = pos[0];
        let c = pos[1];
        //Cannot click on a flagged tile
        if(this.flags[r][c]){
            return;
        }
        if(this.mines[r][c]){
            
            for(let i = 0;i<this.rows;i++){
                for(let j = 0;j<this.columns;j++){
                    if(this.mines[i][j] && !this.flags[i][j]){
                        this.drawSprite(i,j,"mine");
                    }
                    if(!this.mines[i][j] && this.flags[i][j]){
                        this.drawSprite(i,j,"wrongflag");
                    }
                }
            }
            this.drawSprite(r,c,"redmine");
            this.endGame(false);
            //gameover, reveal all mines
        } else{
            this.visit(r,c);
            if(this.movesLeft === 0){
                //Victory!
                this.endGame(true);
            }
        }
        
    }
    flag(e){
        e.preventDefault(); e.stopPropagation();
        let pos = this.getCursorPosition(this.canvas,e);
        let r = pos[0];
        let c = pos[1];
        console.log(r);
        if(!this.visited[r][c]){
            if(this.flags[r][c]){
                this.flagsLeft++;
            } else{
                this.flagsLeft--;
            }
            this.flagsTracker.innerHTML = this.flagsLeft;
            this.flags[r][c] = !this.flags[r][c];
            this.drawSprite(r,c,this.flags[r][c] ? "flag" : "unclicked");
        }


    }
    render(){
        //Just show red for mines, black for all else
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.columns;j++){
                this.drawSprite(i,j,"unclicked");
            }
        }
    }
    deconstruct(){
        this.canvas.outerHTML="";
        if(this.status){
            this.status.outerHTML="";
        }
        clearInterval(this.timer);
        this.canvas.onclick = undefined;
        this.canvas.oncontextmenu = undefined;
        delete this.canvas;
    }
}
window.onload = function(){
    let game;
    document.getElementById("begin").onclick = () => {
        if(game) game.deconstruct();
        let gameMode = document.getElementById("dropdown").value;
        switch(gameMode){
            case "beginner":
                game = new Minesweeper(9,9,10);
                break;
            case "intermediate":
                game = new Minesweeper(13,15,40);
                break;
            case "expert":
                game = new Minesweeper(16,30,99);
                break;
        }
    }
}