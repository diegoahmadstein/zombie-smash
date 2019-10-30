var wWeapon = 0;
function handlePCAnimation() {
  if (CONTROLS.playerCharacter.forward) {
    PLAYER_CHARACTER.v = -2.5;
  }
  if (PLAYER_CHARACTER.v != 0) {
    PLAYER_CHARACTER.v += PLAYER_CHARACTER.a;
    }

  if (CONTROLS.playerCharacter.backward){
    PLAYER_CHARACTER.y += 2*PLAYER_CHARACTER.v;
  }
    else{
      PLAYER_CHARACTER.y += PLAYER_CHARACTER.v;
    }


  if (CONTROLS.playerCharacter.rotateCounterClockwise) {
    PLAYER_CHARACTER.x -= 4;
  }
  if (CONTROLS.playerCharacter.rotateClockwise) {
    PLAYER_CHARACTER.x += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (PLAYER_CHARACTER.x < 0) {
    PLAYER_CHARACTER.x = 0;
  } else if (PLAYER_CHARACTER.x >  GAME.canvas.width) {
    PLAYER_CHARACTER.x = 600;
  } else if (PLAYER_CHARACTER.y < 0) {
    PLAYER_CHARACTER.y = 0;
  } else if (PLAYER_CHARACTER.y > GAME.canvas.height) {
    PLAYER_CHARACTER.y = 300;
  }
}
function handleWeaponAnimation(){
  if(wWeapon = 0){
    initializeWeapon(initializeWeapon())
  } else if(wWeapon = 1){
    initializeWeapon(melee,)
  }
}


function RenderPC(context) {
  var canvas = document.getElementById('mainCanvas');
  var pcImage = new Image();
    pcImage.src = 'character 1 face.png';

  context.drawImage(pcImage, PLAYER_CHARACTER.x, PLAYER_CHARACTER.y,25,25);
}

function RenderWeapon(context){
  var canvas = document.getElementById('mainCanvas');
  var weaponImage = new Image ();

  while(PLAYER_CHARACTER.pickWeapon){
    wWeapon +=1;
  }
  if(wWeapon = 0) {
    weaponImage.src = 'club.png';
  } else if(wWeapon = 1){
    weaponImage.src = 'excalibur.jpg';
  } else if (wWeapon = 2){
    weaponImage.src = 'flamethrower.png';
  } else if(wWeapon = 3){
    weaponImage.src = 'handgun.png';
  }else if(wWeapon = 4){
    weaponImage.src = 'katana.png';
  }else if(wWeapon = 5){
    weaponImage.src = 'semiauto.png';
  }else if(wWeapon = 6){
    weaponImage.src = 'sniperrifle.png';
  }
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');



  if (GAME.started) {

    // 1 - Reposition the objects
    handlePCAnimation();
    handleWeaponAnimation();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderPC(context);
    RenderWeapon(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
