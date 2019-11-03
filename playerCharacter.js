// Populate a global variable for the spaceship
function initializePC() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);

  PLAYER_CHARACTER = {
    x : 300,
    y : 150,
    dna: 0,
    strength: 1,
    speed: 1.5,
    baseHP: 100,
    hp: 100,
    luck: 10,
    theta : 0,
    wepOn :0,
    weapons: [0, 2, 4],
    initialized : true
  };
}
