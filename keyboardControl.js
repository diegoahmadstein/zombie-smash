var CONTROLS = {
  playerCharacter: {
    up: false,
    down: false,
    right: false,
    left: false,
    rotateClockwise: false,
    rotateCounterClockwise: false,
    pickWeapon: false,
    attack: false,
    reload : false
  },
shop: {mouseX :0, mouseY:0, click:false, nextLevel: false}
};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "w":
      CONTROLS.playerCharacter.up = true;
      break;
    case "s":
      CONTROLS.playerCharacter.down = true;
      break;
    case "ArrowLeft":
      CONTROLS.playerCharacter.rotateCounterClockwise = true;
      break;
    case "ArrowRight":
      CONTROLS.playerCharacter.rotateClockwise = true;
      break;
    case "a":
      CONTROLS.playerCharacter.left = true;
      break;
    case "d":
      CONTROLS.playerCharacter.right = true;
      break;
    case "Shift":
      CONTROLS.playerCharacter.pickWeapon = true;
      break;
    case " ":
      CONTROLS.playerCharacter.attack = true;
      break;
    case "r":
      CONTROLS.playerCharacter.reload = true;
      break;
      case "Enter":
        CONTROLS.shop.nextLevel = true;
        break;
    default:
      break;
  }
});

document.addEventListener('click', function(event) {
  CONTROLS.shop.mouseX = event.clientX -5;
  CONTROLS.shop.mouseY = event.clientY -5;
  CONTROLS.shop.click = true;
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "w":
      CONTROLS.playerCharacter.up = false;
      break;
    case "s":
      CONTROLS.playerCharacter.down = false;
      break;
    case "ArrowLeft":
      CONTROLS.playerCharacter.rotateCounterClockwise = false;
      break;
    case "ArrowRight":
      CONTROLS.playerCharacter.rotateClockwise = false;
      break;
    case "a":
      CONTROLS.playerCharacter.left = false;
      break;
    case "d":
      CONTROLS.playerCharacter.right = false;
      break;
    case "Shift":
      CONTROLS.playerCharacter.pickWeapon = false;
      break;
    case " ":
      CONTROLS.playerCharacter.attack = false;
      break;
    case "r":
      CONTROLS.playerCharacter.reload = false;
      break;
    default:
      break;
  }
});
