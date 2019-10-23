var CONTROLS = {
  playerCharacter : {
    forward : false,
    back : false,
    rotateClockwise : false,
    rotateCounterClockwise : false
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "ArrowUp":
      CONTROLS.playerCharacter.forward = true;
      break;
    case "ArrowDown":
      CONTROLS.playerCharacter.backward = true;
      break;
    case "ArrowLeft":
      CONTROLS.playerCharacter.rotateCounterClockwise = true;
      break;
    case "ArrowRight":
      CONTROLS.playerCharacter.rotateClockwise = true;
      break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "ArrowUp":
      CONTROLS.playerCharacter.forward = false;
      break;
    case "ArrowDown":
      CONTROLS.playerCharacter.backward = false;
      break;
    case "ArrowLeft":
      CONTROLS.playerCharacter.rotateCounterClockwise = false;
      break;
    case "ArrowRight":
      CONTROLS.playerCharacter.rotateClockwise = false;
      break;
    default:
      break;
  }
});
