// Populate a global variable for the spaceship
function initializePC() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1, 1);

  PLAYER_CHARACTER = {
    x: 300,
    y: 150,
    dna: 0,
    strength: 1,
    speed: 1.5,
    baseHP: 100,
    hp: 100,
    luck: 10,
    theta: 0,
    wepOn: 0,
    weapons: [2, 3, 4],
    initialized: true
  };
}

//does two different things depending on whether the weapon is ranged or melee. note that for implementation reasons, the flamethrower is considered a melee weapon
function attack() {
  var weapon = WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]];

  //melee weapon stuff. warning: very confusing. if you need to touch this stuff, ask diego to explain it.
  if (weapon.class == "melee") {
    for (zombie of ZOMBIES){
      var xDis = zombie.x+10 -PLAYER_CHARACTER.x;
      var yDis = -1*(zombie.y+10 - PLAYER_CHARACTER.y);
      var angle = Math.atan2(yDis, xDis);
      if (angle<0){ angle += (2*Math.PI);}
      var disBetween = Math.sqrt((xDis*xDis) + (yDis * yDis));
      var weirdTheta = 2*Math.PI - PLAYER_CHARACTER.theta;
      var lowerRange = weirdTheta -(weapon.angle*Math.PI/180);
      var upperRange =weirdTheta+(weapon.angle*Math.PI/180);
      var rad = 50;
      if (weapon.name=="Flamethrower"){rad = 150;}
      if (upperRange >= 2*Math.PI){
        upperRange = upperRange % (2*Math.PI);
        if (disBetween<=rad && (angle<=upperRange || angle>=lowerRange)){
          zombie.hp -= weapon.damage;
        }
      }
      else if (lowerRange < 0){
        lowerRange = lowerRange + 2*Math.PI;
        if (disBetween<=rad && (angle<=upperRange || angle>=lowerRange)){
          zombie.hp -= weapon.damage;
        }
      }
      else if (disBetween<=rad && angle>= lowerRange && angle<= upperRange){
        zombie.hp -= weapon.damage;
      }
    }
  }
//ranged weapon stuff
  else {
    var pierces;
    if (weapon.name=="Sniper"){pierces=true;}
    else{pierces=false;}
    BULLETS.push({
      x: PLAYER_CHARACTER.x + 25 * Math.cos(PLAYER_CHARACTER.theta),
      y: PLAYER_CHARACTER.y + 25 * Math.sin(PLAYER_CHARACTER.theta),
      speed: weapon.bulletSpeed,
      damage: weapon.damage,
      knockback: weapon.knockback,
      pierces: pierces,
      angle: PLAYER_CHARACTER.theta
    });
  }
}


//this reloads your weapon, takes from ammoOwned and refills ammoLeftInClip
function reload(){
  if (WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoOwned>=WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].clipSize-WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip){
    WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoOwned-=WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].clipSize-WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip;
    WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip=WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].clipSize;
  }
}
