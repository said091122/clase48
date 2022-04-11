var bg,bgImg;
var player, shooterImg, shooter_shooting;
var jugador;
var zombie,zombieImg;
var corazon1Img,corazon2Img,corazon3Img;
var corazon1,corazon2,corazon3;
var grupZombie;
var gameState="pelea";
var bala,balaImg;
var ball=70;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  jugador = loadImage("assets/shooter_1.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  corazon1Img = loadImage("assets/heart_1.png")
  corazon2Img = loadImage("assets/heart_2.png")
  corazon3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  corazon1 = createSprite(displayWidth=-150,40,20,20)
  corazon1.visible=false;
  corazon1.addImage("corazon1",corazon1Img)
  corazon1.scale=0.4;

  corazon2 = createSprite(displayWidth=-100,40,20,20)
  corazon2.visible=false;
  corazon2.addImage("corazon2",corazon2Img)
  corazon2.scale=0.4;

  corazon3 = createSprite(displayWidth=-150,40,20,20)
  corazon3.addImage("corazon3",corazon3Img)
  corazon3.scale=0.4;

  zombie=new Group()
  balas = new Group()

}

function draw() {
  background(0); 



if(gameState === "pelea"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x=player.x+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x=player.x-30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  bala=createSprite(displayWidth-1150,player.y-30,20,10);
  bala.velocityX=20;
  balas.add(bala);
  player.depth = bullet.depth;
  player.depth = player.depth+2;
  player.addImage(shooter_shooting)
  ball=ball-1;

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
}

if(ball===0){
  gameState="sinBalas";
}

if(zombie.isTouching(ball)){
  for(var i=0;i<zombie.length;i++){
    if(zombie[i].isTouching(ball)){
      //es lo miosmo
      zombie[i].destroy()
      ball.destroyEach()
    }
  }
}


//zombie.velocityX = zombie.velocityX - 0

if(zombie.isTouching(player)){
  for(var i=0;i<zombie.length;i++){
    if(zombie[i].isTouching(player)){
      zombie[i].destroy()
      
    }
  }
}

zombies()

drawSprites();

if(gameState === "perdiste"){
  textSize(100) 
  fill("red")
  text("perdiste",400,400)
  zombie.destroyEach()
  player.destroy()
 
}

if(gameState === "ganaste"){
  textSize(100) 
  fill("green")
  text("lo lograste",400,400)
  zombie.destroyEach()
  player.destroy()
  
}

}

function zombies(){
if(frameCount%50===0){
zombie= createSprite(random(500,1100),random(100,500),40,40);
zombie.addImage(zombieImg)
zombie.scale=0.15;
zombie.velocityX=-3;
zombie.debug=true;
zombie.lifetime=400
grupZombie.add(zombie)
}
}
