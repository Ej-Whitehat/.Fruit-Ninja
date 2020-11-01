var PLAY = 1;
var END = 0;
var GameState = PLAY;
var score;
var monsterGroup

function preload(){
swordimage = loadAnimation("sword.png")
enemy = loadAnimation("alien1.png","alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
gameOverImage = loadImage("gameover.png");

knifeSound = loadSound("knifeSwooshSound.mp3");
gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(500, 500);
  sword = createSprite(250, 250, 20, 20);
  sword.addAnimation("swordimage1", swordimage);  
  sword.addAnimation("gameOver", gameOverImage)
  sword.scale = 0.7;
  
  monstersGroup = createGroup();
  fruitsGroup = createGroup();
  
  score = 0;
}

function draw() {
background(180);
text("Score: "+ score, 500,50);
  if(GameState == PLAY){
  sword.x = World.mouseX;
  sword.y = World.mouseY;
    
    console.log(score)
    
    enemies();
    fruits();
    if(fruitsGroup.isTouching(sword)){
      score = score + 1;
      knifeSound.play();
      fruitsGroup.destroyEach();
    }
    if(monstersGroup.isTouching (sword)){
      monstersGroup.destroyEach();
      gameOverSound.play();
      GameState = END;
    }
  }
  else if(GameState == END){
  monstersGroup.destroyEach();
  fruitsGroup.destroyEach();
  sword.x = 250;
  sword.y = 250;
  sword.changeImage("gameOver", gameOverImage);
    sword.scale = 2;
  }
drawSprites();
}

function enemies(){
  if (World.frameCount%200==0){
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("monsters", enemy);
    monster.y = Math.round(random(50, 450));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    monstersGroup.add (monster);
  }
}

function fruits(){
  if(World.frameCount%80==0){
    position = Math.round(random(1,2));
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    if(position == 1){
      fruit.x = 600;
      fruit.velocityX = -7;
    }
    else if(position == 2){
      fruit.x = 0;
      fruit.velocityX = 7;
    }
    r = Math.round(random(1, 4));
    if(r == 1){
      fruit.addImage("fruitImage1", fruit1);
    }
    else if(r == 2){
      fruit.addImage("fruitImage2", fruit2);
    }
    else if(r == 3){
      fruit.addImage("fruitImage3", fruit3);
    }
    else {
      fruit.addImage("fruitImage4", fruit4);
    }
    
    fruit.y = Math.round(random(50, 450));
    fruit.lifetime = 100;
    fruitsGroup.add(fruit);
  }
}