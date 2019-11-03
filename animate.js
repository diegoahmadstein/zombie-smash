var wSwitchCooldown =0;
var zombieCooldown =0;
function handlePCAnimation() {

  if (CONTROLS.playerCharacter.rotateCounterClockwise) {
    PLAYER_CHARACTER.theta-=Math.sqrt(PLAYER_CHARACTER.speed)*Math.PI/60;
  }
  if (CONTROLS.playerCharacter.rotateClockwise) {
    PLAYER_CHARACTER.theta+=Math.sqrt(PLAYER_CHARACTER.speed)*Math.PI/60;
  }
  if (CONTROLS.playerCharacter.up) {
    PLAYER_CHARACTER.y -= PLAYER_CHARACTER.speed*Math.cos(PLAYER_CHARACTER.theta);
    PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed*Math.sin(PLAYER_CHARACTER.theta);
  }
  if (CONTROLS.playerCharacter.down){
    PLAYER_CHARACTER.y += PLAYER_CHARACTER.speed*Math.cos(PLAYER_CHARACTER.theta);
    PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed*Math.sin(PLAYER_CHARACTER.theta);
  }
  if (CONTROLS.playerCharacter.left) {
    PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed*Math.cos(PLAYER_CHARACTER.theta);
    PLAYER_CHARACTER.y -= PLAYER_CHARACTER.speed*Math.sin(PLAYER_CHARACTER.theta);
  }if (CONTROLS.playerCharacter.right) {
    PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed*Math.cos(PLAYER_CHARACTER.theta);
    PLAYER_CHARACTER.y += PLAYER_CHARACTER.speed*Math.sin(PLAYER_CHARACTER.theta);
  }


  // Check if player is leaving the boundary, if so, stop it
  if (PLAYER_CHARACTER.x < 0) {
    PLAYER_CHARACTER.x = 0;
  }  if (PLAYER_CHARACTER.x >  GAME.canvas.width) {
    PLAYER_CHARACTER.x = 600;
  }  if (PLAYER_CHARACTER.y < 0) {
    PLAYER_CHARACTER.y = 0;
  }  if (PLAYER_CHARACTER.y > GAME.canvas.height) {
    PLAYER_CHARACTER.y = 300;
  }
}

function RenderPC(context) {
  var canvas = document.getElementById('mainCanvas');
  var pcImage = new Image();
    pcImage.src = 'Sprites\\character 1 face.png';
    drawRotatedImage(context, pcImage, PLAYER_CHARACTER.x, PLAYER_CHARACTER.y, 26,26, PLAYER_CHARACTER.theta);

}

function drawRotatedImage(context, image, x, y, width, height, angle) {
context.save();
context.translate(x, y);
context.rotate(angle);
context.drawImage(image, -width/2, -height/2, width, height) ;
context.restore();
  //To make this function work for top left, change translate(x, y) to translate(x+width/2, y+height/2)
  //Then, make the drawImage(image, 0, 0, width, height);
}

function RenderWeapon(context){
  var canvas = document.getElementById('mainCanvas');
  var weaponImage = new Image ();

  if(wSwitchCooldown<= 0 &&CONTROLS.playerCharacter.pickWeapon){
    PLAYER_CHARACTER.wepOn++;
    if (PLAYER_CHARACTER.wepOn==3){
      PLAYER_CHARACTER.wepOn=0;
    }
    wSwitchCooldown =30;
  }
  wSwitchCooldown--;
  if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 0) {
    weaponImage.src = 'Sprites\\club.png';
  } else if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 6){
    weaponImage.src = 'Sprites\\excalibur.png';
  } else if (PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 3){
    weaponImage.src = 'Sprites\\flamethrower.png';
  } else if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 2){
    weaponImage.src = 'Sprites\\handgun.png';
  }else if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 1){
    weaponImage.src = 'Sprites\\katana.png';
  }else if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 4){
    weaponImage.src = 'Sprites\\semiauto.png';
  }else if(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 5){
    weaponImage.src = 'Sprites\\sniperrifle.png';
  }
  context.drawImage(weaponImage, 87, 2, 15, 15);
  drawRotatedImage(context, weaponImage, PLAYER_CHARACTER.x+15*Math.cos(PLAYER_CHARACTER.theta), PLAYER_CHARACTER.y+15*Math.sin(PLAYER_CHARACTER.theta), 20, 20, PLAYER_CHARACTER.theta);
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');



  if (GAME.started) {
    if (GAME.levelTime!=0) {
    // 1 - Reposition the objects
    handlePCAnimation();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderPC(context);
    RenderWeapon(context);
    context.font = "10px Arial";
    if (WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].clipSize==-1){
      context.fillText("HP: "+PLAYER_CHARACTER.hp+ "  DNA: "+PLAYER_CHARACTER.dna + "       ∞/∞", 10, 15);
    }
    else{
      context.fillText("HP: "+PLAYER_CHARACTER.hp+ "  DNA: "+PLAYER_CHARACTER.dna + "         "+WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].ammoLeftInClip+"/"+WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].ammoOwned, 10, 15);
    }

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
}
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
