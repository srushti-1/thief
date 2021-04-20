var jail, jailImage;
var police, policeImage, policeGroup;
var thief, thiefImage;
var score = 0;
var gameState = "play";
var invisibleGround;
var topEdge;

function preload(){
  jailImage = loadImage("jail-corridor-grid-door-cartoon-style-hallway-prison-cell-interior-lattice-cartoon-vector-art-jail-corridor-grid-151345258.jpg");
  policeImage = loadImage("download__3_-removebg-preview.png");
  thiefImage = loadImage("download__2_-removebg-preview.png");
}

function setup(){
  createCanvas(400, 200);
  jail = createSprite(10, 100, 400, 200);        
  jail.addImage(jailImage);
  jail.x = jail.width/2;
  
  topEdge = createSprite(200, 5, 400, 10)
  topEdge.visible = false;
  
  invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  thief = createSprite(350, 200);
  thief.addImage(thiefImage);
  thief.scale = 0.4;


  
  policeGroup = new Group();

  
}



function draw(){


  if(gameState === "play"){
    if (jail.x > 400){
      jail.x = jail.width/2;
    }
        jail.velocityX = 5;  
  
    
    if (frameCount % 10 === 0){
      score = score + 1;
      
    }


    
    if(keyDown("space")) {
        thief.velocityY = -12;
    }
    
    thief.velocityY = thief.velocityY + 0.8

    spawnObstacles();
    
    if(thief.isTouching(policeGroup)){
        gameState = "end";
      
    }
  }
   
     else if (gameState === "end") {
      jail.velocityX = 0;
      thief.velocityY = 0
      
    policeGroup.setLifetimeEach(-1);
     
     policeGroup.setVelocityXEach(0);
     }
   
  
  thief.collide(invisibleGround);
    thief.collide(topEdge);
  
  


  drawSprites();
    text("Score: "+ score, 50, 50);

    camera.position.y = height/2;
    camera.position.x = thief.x;
  

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   police = createSprite(10,170,10,40);
   police.velocityX = 6;
   police.addImage(policeImage);
    police.scale = 0.3;
    police.lifetime = 200;
    policeGroup.add(police);
 }
}

