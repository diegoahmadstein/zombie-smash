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

function RenderPC(context) {
  var canvas = document.getElementById('mainCanvas');
  var pcImage = new Image();
    pcImage.src = 'character 1 face.png';

  context.drawImage(pcImage, PLAYER_CHARACTER.x, PLAYER_CHARACTER.y,25,25);
}

function HandleNewObjectMovement() {
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');



  if (GAME.started) {

    // 1 - Reposition the objects
    handlePCAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderPC(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
