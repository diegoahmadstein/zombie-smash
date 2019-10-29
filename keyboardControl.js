var CONTROLS = {
  playerCharacter : {
    forward : false,
    back : false,
    rotateClockwise : false,
    rotateCounterClockwise : false,
    pickWeapon: false
  }

};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "w":
      CONTROLS.playerCharacter.forward = true;
      break;
    case "s":
      CONTROLS.playerCharacter.backward = true;
      break;
    case "a":
      CONTROLS.playerCharacter.rotateCounterClockwise = true;
      break;
    case "d":
      CONTROLS.playerCharacter.rotateClockwise = true;
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
      CONTROLS.playerCharacter.forward = false;
      break;
    case "s":
      CONTROLS.playerCharacter.backward = false;
      break;
    case "a":
      CONTROLS.playerCharacter.rotateCounterClockwise = false;
      break;
    case "d":
      CONTROLS.playerCharacter.rotateClockwise = false;
      break;
    case "p":
      CONTROLS.playerCharacter.pickWeapon = false;
    default:
      break;
  }
});
