function initializeWeapon(class,coolDown,clipSize,ammoOwned,ammoLeft,damage){
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);


  WEAPON = {
    x:310,
    y:150,
    positions : [
      {
        x : 0,
        y : 3
      },
      {
        x : 2,
        y : -3
      },
      {
        x : 0,
        y : 0
      },
      {
        x : -2,
        y : -3
      },
      {
        x : 0,
        y : 3
      }
    ],
    latest : {
        x : WEAPON.x,
        y : WEAPON.y,
    },
    class: 0,
    coolDown:0,
    clipSize:0,
    ammoOwned:0,
    ammoLeft:0,
    damage:0
  }
  return WEAPON;
}
