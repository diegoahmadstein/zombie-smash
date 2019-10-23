function handlePCAnimation() {
  if (CONTROLS.playerCharacter.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed * sin;
    PLAYER_CHARACTER.y +=  PLAYER_CHARACTER.speed * cos;
  }
  if (CONTROLS.playerCharacter.backward) {
    var radians = (Math.PI / 180) * PLAYER_CHARACTER.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed * sin;
    PLAYER_CHARACTER.y -=  PLAYER_CHARACTER.speed * cos;
  }
  if (CONTROLS.playerCharacter.rotateClockwise) {
    PLAYER_CHARACTER.rotation -= 4;
  }
  if (CONTROLS.playerCharacter.rotateCounterClockwise) {
    PLAYER_CHARACTER.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (PLAYER_CHARACTER.x > GAME.canvas.width) {
    PLAYER_CHARACTER.x = 0;
  } else if (PLAYER_CHARACTER.x < 0) {
    PLAYER_CHARACTER.x = 600;
  } else if (PLAYER_CHARACTER.y > GAME.canvas.height) {
    PLAYER_CHARACTER.y = 0;
  } else if (PLAYER_CHARACTER.y < 0) {
    PLAYER_CHARACTER.y = 300;
  }
}

function RenderNewObject(context) {
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
    RenderSpaceship(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
