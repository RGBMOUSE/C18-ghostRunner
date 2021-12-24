var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  invisibleBlocksGroup = new Group();

  doorsGroup = new Group()
  climbersGroup = new Group()

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.4;
}

function draw() {
  background(200);
  
if(gameState === "play"){
  if(tower.y > 400){
      tower.y = 300
    }

spawnDoors();
    

if(climbersGroup.isTouching (ghost)){
  ghost.velocityY = 0;
}

    if(keyDown("space")){
      ghost.velocityY = -5;
     }
     ghost.velocityY = ghost.velocityY + 0.5;
   
     if(keyDown(LEFT_ARROW)){
       ghost.x = ghost.x -1;
      }
   
      if(keyDown("right_arrow")){
       ghost.x = ghost.x +1;
      }
   if(invisibleBlocksGroup.isTouching (ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "end";
   }
    drawSprites();
}

if(gameState === "end"){
text("Game Over",300,300)
}

}

function spawnDoors(){

if(frameCount % 240 === 0){
door = createSprite(200,-50);

ghost.depth = door.depth
ghost.depth += 1;

door.addImage(doorImg);
door.x = Math.round(random(120,400));

climber = createSprite(200,10);
climber.addImage(climberImg);

invisibleBlocks = createSprite(200,15)
invisibleBlocks.visible = false;
invisibleBlocks.width = climber.width;
invisibleBlocks.hieght = 2;
invisibleBlocks.x = door.x;
invisibleBlocks.velocityY = 1;
invisibleBlocksGroup.add(invisibleBlocks);

door.velocityY = 1;
door.lifetime = 600;

climber.x = door.x;
climber.velocityY = 1;
climber.lifetime = 600;

doorsGroup.add(door);
climbersGroup.add(climber);
}



}
