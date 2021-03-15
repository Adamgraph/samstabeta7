let myGamePiece;
let myObstacles = [];
let myScore;
let mySound;
let myMusic;

function startGame() {
    myGamePiece = new component(33, 39, "./img/spaceship06.png", 400, 400, "image");
    myGamePiece.gravity = 0.05;
  
    mySound = new sound("./sound/hitsound3.ogg");    //hit sound
 
    myScore = new component("15px", "Ubuntu Mono", "white", 680, 40, "text"); // score in the corner but its really fast

    yellowGamePiece = new component(37, 39, "./img/astero.png", 50, 60, "image");  //Part of Asteroid
    blueGamePiece = new component(37, 39, "./img/astero.png", 10, 220, "image");  //Part of Asteroid

    orangeGamePiece = new component(37, 39, "./img/astero.png", 10, 220, "image");  //Part of Asteroid

    greenGamePiece = new component(37, 39, "./img/astero.png", -40, -50, "image");  //Part of Asteroid
    whiteGamePiece = new component(37, 39, "./img/astero.png", 110, 50, "image");  //Part of Asteroid

    yellowGamePiece = new component(37, 39, "./img/astero.png", 650, 60, "image");  //Part of Asteroid

    myMusic = new sound("./sound/niceloop2l2.ogg"); //music space
    myMusic.play();
    myMusic = new sound("./sound/niceloop2lowplus.ogg"); //music space
    myMusic.play();

    myGameArea.start();
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 470;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

   this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}



function component(width, height, color, x, y, type) {
    this.type = type;

  if (type == "image") {
        this.image = new Image();
        this.image.src = color;
  }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY ; //+ this.gravityspeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        let rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        } 
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

//must be here so it plays before function updateGameArea()
    function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;

    this.sound.loop = true; // true; //music looooooop forever 

    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
 

 //   gameupdate rewind 
function updateGameArea() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
        mySound.play();    //music sound only
         myGameArea.stop(); //music sound only possibly
            return;
        } 
if (myGamePiece.crashWith(yellowGamePiece)) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 21; // was 1  121was perfect
    if (myGameArea.frameNo == 1 || everyinterval(650)) {           // 350 to hard 50 is to much 450 is nice 650perfect


  //   Asteroid field. first number, number is size, second number,number is position -2000 very late
     myObstacles.push(new component(63, 66, "./img/astero4.png", 50, -31, "image"));
     myObstacles.push(new component(37, 39, "./img/astero4.png", 280, 100, "image"));
     myObstacles.push(new component(37, 39, "./img/astero4.png", 480, -19, "image"));
     myObstacles.push(new component(63, 66, "./img/astero4.png", 580, -10, "image"));
     myObstacles.push(new component(37, 39, "./img/astero4.png", 680, -100, "image"));

     myObstacles.push(new component(63, 66, "./img/astero4.png", 150, -440, "image"));
     myObstacles.push(new component(63, 66, "./img/astero3.png", 150, -440, "image"));

     myObstacles.push(new component(41, 40, "./img/astero4.png", 380, -361, "image"));

     myObstacles.push(new component(63, 66, "./img/astero4.png", 480, -249, "image"));

     myObstacles.push(new component(59, 48, "./img/astero4.png", 580, -540, "image"));
     myObstacles.push(new component(59, 48,  "./img/astero3.png", 580, -540, "image"));

     myObstacles.push(new component(41, 40, "./img/astero4.png", 680, -330, "image"));

     myObstacles.push(new component(37, 39, "./img/astero4.png", 250, -161, "image"));

     myObstacles.push(new component(59, 48,  "./img/astero3.png", 380, -2240, "image"));
     myObstacles.push(new component(37, 39,  "./img/astero3.png", 750, -2240, "image"));
     myObstacles.push(new component(59, 48,  "./img/astero4.png", 280, -2040, "image"));
     myObstacles.push(new component(109, 108,  "./img/astero4.png", 210, -2940, "image"));
     myObstacles.push(new component(89, 88,  "./img/astero4.png", 410, -3440, "image"));
     myObstacles.push(new component(89, 88,  "./img/astero3.png", 410, -3440, "image"));
     myObstacles.push(new component(89, 88,  "./img/astero4.png", 10, -3440, "image"));
     myObstacles.push(new component(37, 39,  "./img/astero3.png", 110, -3140, "image"));
     myObstacles.push(new component(59, 48,  "./img/astero4.png", 750, -3240, "image"));

    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;                                 // DIRECTION OF elements Important, thats it!
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -5; } //how fast  for moving sideways
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 5; } //how fast  for moving sideways

    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //how fast  for moving updown
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 4; } //how fast  for moving updown


     yellowGamePiece.x += 1;    
     yellowGamePiece.y += 2;      
     yellowGamePiece.update(); 

     blueGamePiece.x += 1;   
     blueGamePiece.y -= 1;      
     blueGamePiece.update();    

     greenGamePiece.x += 1;   
     greenGamePiece.y += 1;        
     greenGamePiece.update();

     whiteGamePiece.x += 2;        
     whiteGamePiece.y += 1;      
     whiteGamePiece.update();    

     whiteGamePiece.x += 1;       
     whiteGamePiece.y += 2;       
     whiteGamePiece.update();   

     orangeGamePiece.x -= 3;       
     orangeGamePiece.y -= 1;      
     orangeGamePiece.update();   

     myGamePiece.newPos();
     myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}



