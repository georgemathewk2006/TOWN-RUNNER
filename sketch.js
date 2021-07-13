var backImage,backgr;
var player, player_running;
var ground;
var obstaclesGroup, obstacle_img,batGroup,bat_img
var batGroup,bat_img,carGroup,car_img,gameOver_img,startsound,gameoverSound;
var gameState="play";

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("BG.jpg");
  player_running=loadImage("BOY.png");
  bat_img=loadImage("bats.png");
  car_img=loadImage("car.png");
  obstacle_img = loadImage("scooter.png");  
  gameOver_img = loadImage("game-over.png");  
  startsound = loadSound("Start sound.wav");
  gameoverSound = loadSound("Gameover.wav");
}

function setup() {
  createCanvas(800,600);
  
  backgr=createSprite(0,0,800,600);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(70,420,20,50);
  player.addImage(player_running);
  player.scale = 0.25;
  
  ground = createSprite(400,450,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,230,200,200);
  gameOver.addImage(gameOver_img);
  gameOver.visible=false;
  gameOver.scale= 0.7;
  
  batGroup = new Group();
  carGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(255);  
  if (gameState==="play"){
    score=Math.round(frameCount/4);
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    if(keyDown("space") && player.y>280) {
        player.velocityY = -12;
        startsound.play();
      }
      player.velocityY = player.velocityY + 0.8;
      spawnObstacles();
      spawnBats();
      spawnCars();
      if(batGroup.isTouching(player)||obstaclesGroup.isTouching(player)||carGroup.isTouching(player)){
        gameState="end"
    }
  }
  else if(gameState==="end"){
    gameoverSound.play();
    player.velocityY=0;
    backgr.velocityX=0;
    batGroup.setVelocityXEach(0);
    carGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    batGroup.setLifetimeEach(0);
    carGroup.setLifetimeEach(0);
    obstaclesGroup.setLifetimeEach(0);
    background("black");
    gameOver.visible=true;
    player.visible=false;
    backgr.visible=false;
  }
  
  
    player.collide(ground);
    
    drawSprites();
  
    stroke("white");
    textSize(30);
    fill("red");
    text("Score: "+ score, 40,50);
}

function spawnBats() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var bat = createSprite(800,200,40,10);
    bat.y = random(150,200);    
    bat.addImage(bat_img);
    bat.scale = 0.15;
    bat.velocityX = -5;
     //assign lifetime to the variable
    bat.lifetime = 300;
    player.depth = bat.depth + 1;
    
    //add each bat to the group
    batGroup.add(bat);
  }
}

function spawnCars() {
  //write code here to spawn the food
  if (frameCount % 250 === 0) {
    var car = createSprite(810,470,40,10);
    car.y = random(420,450);    
    car.addImage(car_img);
    car.scale = 0.5;
    car.velocityX = -5;
     //assign lifetime to the variable
    car.lifetime = 300;
    player.depth = car.depth + 1;
    
    //add each car to the group
    carGroup.add(car);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(800,random(380,470),10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
