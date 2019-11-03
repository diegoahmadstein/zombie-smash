var CONTROLS = {
  playerCharacter: {
    up: false,
    down: false,
    right: false,
    left: false,
    rotateClockwise: false,
    rotateCounterClockwise: false,
    pickWeapon: false,
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "w":
      CONTROLS.playerCharacter.up = true;
      break;
    case "s":
      CONTROLS.playerCharacter.down = true;
      break;
    case "q":
      CONTROLS.playerCharacter.rotateCounterClockwise = true;
      break;
    case "e":
      CONTROLS.playerCharacter.rotateClockwise = true;
      break;
    case "a":
      CONTROLS.playerCharacter.left = true;
      break;
    case "d":
      CONTROLS.playerCharacter.right = true;
      break;
    case "p":
      CONTROLS.playerCharacter.pickWeapon = true;
      break;
    default:
      break;
  }
});


document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "w":
      CONTROLS.playerCharacter.up = false;
      break;
    case "s":
      CONTROLS.playerCharacter.down = false;
      break;
    case "q":
      CONTROLS.playerCharacter.rotateCounterClockwise = false;
      break;
    case "e":
      CONTROLS.playerCharacter.rotateClockwise = false;
      break;
    case "a":
      CONTROLS.playerCharacter.left = false;
      break;
    case "d":
      CONTROLS.playerCharacter.right = false;
      break;
    case "p":
      CONTROLS.playerCharacter.pickWeapon = false;
      break;
    default:
      break;
  }
});
