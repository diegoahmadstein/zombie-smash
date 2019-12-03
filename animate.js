var wSwitchCooldown = 0; //reset to 30 when you switch weapons. decrememented each frame.
var zombieCooldown = 0; //will be set to an amount equal to 7200 / #zombies that are supposed to spawn this level. decrememented each frame.
var aCooldown = 0; //will be reset to the cooldown of the current weapon whenever its used. decrememnted each frame in handleBulletAnimation
var rCooldown = 0; //will be reset to the reloadtime of the weapon. decremented each frame in handleBulletAnimation
var highlighted = 0;
var clubHitSound = new Audio('Zombie Smash Sounds\\zombie hit with club.ogg');
var playerHitSound = new Audio('Zombie Smash Sounds\\player gets hit.wav');
var clubSwing = new Audio('Zombie Smash Sounds\\clubSwing.mp3');
var winSound = new Audio('Zombie Smash Sounds\\game win sound.wav');
var dnaSound = new Audio('Zombie Smash Sounds\\dnaSound.wav');
var loseSound = new Audio('Zombie Smash Sounds\\loseSound.wav');
var katanaSwing = new Audio('Zombie Smash Sounds\\katana swing.wav');
var excalSwing = new Audio('Zombie Smash Sounds\\excalibur swing.wav');
var flameSound = new Audio('Zombie Smash Sounds\\flamethrower.wav');
var gunSound = new Audio('Zombie Smash Sounds\\gunshot for handgun and sniper.wav');
var semiSound = new Audio('Zombie Smash Sounds\\machineGunSound.mp3');
var swordHitSound = new Audio('Zombie Smash Sounds\\zombie cut by katana or excalibur.wav');
var bulletHitSound = new Audio('Zombie Smash Sounds\\zombie getting hit by any bullet.mp3');
var reloadSound = new Audio('Zombie Smash Sounds\\gun reload sound.mp3');
var buySound = new Audio('Zombie Smash Sounds\\upgrade or weapon purchased.wav');
var hasntWon = true;
var beginGame=false;



function handleZombieAnimation() {
  //creates new zombies in empty spaces.
  if (zombieCooldown <= 0 && GAME.levelTime > 0) {
    zombieCooldown = 7200 / GAME.zombiesInc;
    var a;
    var b;
    var isInAZombie = true;
    var tooMuchStuff = 0;
    while (isInAZombie && tooMuchStuff < 1000) {
      tooMuchStuff++;
      isInAZombie = false;
      a = Math.trunc(Math.random() * 580);
      b = Math.trunc(Math.random() * 280);
      for (zombie of ZOMBIES) {
        if (a < zombie.x + 20 && a + 20 > zombie.x && b < zombie.y + 20 && b + 20 > zombie.y) {
          isInAZombie = true;
        }
      }
      if (PLAYER_CHARACTER.x - 13 < a + 20 && PLAYER_CHARACTER.x + 13 >= a && PLAYER_CHARACTER.y - 13 <= b + 20 && PLAYER_CHARACTER.y + 13 > b) {
        isInAZombie = true;
      }
    }
    ZOMBIES.push({
      x: a,
      y: b,
      hp: 100 + 2 * GAME.level,
      cooldown: 60
    }); //zombies' positions measure from their TOP LEFT CORNER. DIFFERENT FROM PLAYER
  }
  GAME.levelTime--;
  zombieCooldown--;

  //checks if zombies should be dead, removes them if so
  for (var i = 0; i < ZOMBIES.length; i++) {
    ZOMBIES[i].cooldown--;
    if (ZOMBIES[i].hp <= 0) {
      var luckNum = (Math.random() * 99) + 1;
      if (luckNum < PLAYER_CHARACTER.luck) {
        DNA.push({
          x: ZOMBIES[i].x,
          y: ZOMBIES[i].y
        });
      }
      ZOMBIES.splice(i, 1);
      i--;
    }

  }
  //if the bullet is on the zombie decrease the health and knockback
  for (var i = 0; i < ZOMBIES.length; i++) {
    for (bullet of BULLETS) {
      if (ZOMBIES[i].x + 20 < bullet.x && ZOMBIES[i].x > bullet.x && ZOMBIES[i].y + 20 < bullet.y && ZOMBIES[i].y > bullet.y) {
        ZOMBIES[i].hp -= WEAPONS[weapons[wepOn]].damage;
        ZOMBIES[i].x += Math.cos(BULLETS[i].angle) * WEAPONS[weapons[wepOn]].knockback;
        ZOMBIES[i].y += Math.sin(BULLETS[i].angle) * WEAPONS[weapons[wepOn]].knockback;
      }
    }



  }



  //moves all zombies closer to the player
  for (var i = 0; i < ZOMBIES.length; i++) {
    var y = ZOMBIES[i].y + 10 - PLAYER_CHARACTER.y;
    var x = ZOMBIES[i].x + 10 - PLAYER_CHARACTER.x;
    ZOMBIES[i].y -= 1 * (y / Math.sqrt((x * x) + (y * y)));
    ZOMBIES[i].x -= 1 * (x / Math.sqrt((x * x) + (y * y)));

    //this next part exists to check if the zombie just moved into the same space as another zombie or player, and undoes the move if so.
    var justSmashed = false;
    if (PLAYER_CHARACTER.x - 13 < ZOMBIES[i].x + 20 && PLAYER_CHARACTER.x + 13 >= ZOMBIES[i].x && PLAYER_CHARACTER.y - 13 <= ZOMBIES[i].y + 20 && PLAYER_CHARACTER.y + 13 > ZOMBIES[i].y) {
      justSmashed = true;
    }
    if (justSmashed) {
      if (ZOMBIES[i].cooldown <= 0) {
        PLAYER_CHARACTER.hp -= 19 + GAME.level;
        playerHitSound.play();
        ZOMBIES[i].cooldown = 120;
      }
    }
    for (otherZombie of ZOMBIES) {
      if (ZOMBIES[i] != otherZombie && otherZombie.x < ZOMBIES[i].x + 20 && otherZombie.x + 20 > ZOMBIES[i].x && otherZombie.y < ZOMBIES[i].y + 20 && otherZombie.y + 20 > ZOMBIES[i].y) {
        justSmashed = true;
      }
    }
    if (justSmashed) {
      ZOMBIES[i].y += 1 * (y / Math.sqrt((x * x) + (y * y)));
      ZOMBIES[i].x += 1 * (x / Math.sqrt((x * x) + (y * y)));
    }
  }
}

function handlePCAnimation() {
  //these if statements handle the movement for the player if their respective buttons are being pressed.
  //they have a similar failsafe to zombies that prevents them from moving the player into a space occupied by a zombie.
  if (CONTROLS.playerCharacter.rotateCounterClockwise) {
    PLAYER_CHARACTER.theta -= Math.sqrt(PLAYER_CHARACTER.speed) * Math.PI / 60;
    if (PLAYER_CHARACTER.theta < 0) {
      PLAYER_CHARACTER.theta += (2 * Math.PI);
    }
  }
  if (CONTROLS.playerCharacter.rotateClockwise) {
    PLAYER_CHARACTER.theta += Math.sqrt(PLAYER_CHARACTER.speed) * Math.PI / 60;
    PLAYER_CHARACTER.theta = PLAYER_CHARACTER.theta % (2 * Math.PI);
  }
  if (CONTROLS.playerCharacter.up) {
    PLAYER_CHARACTER.y -= PLAYER_CHARACTER.speed;
    var justSmashed = false;
    for (zombie of ZOMBIES) {
      if (PLAYER_CHARACTER.x - 13 < zombie.x + 20 && PLAYER_CHARACTER.x + 13 > zombie.x && PLAYER_CHARACTER.y - 13 < zombie.y + 20 && PLAYER_CHARACTER.y + 13 > zombie.y) {
        justSmashed = true;
      }
    }
    if (justSmashed) {

      PLAYER_CHARACTER.y += PLAYER_CHARACTER.speed //* Math.cos(PLAYER_CHARACTER.theta);
      //PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed * Math.sin(PLAYER_CHARACTER.theta);
    }
  }
  if (CONTROLS.playerCharacter.down) {
    PLAYER_CHARACTER.y += PLAYER_CHARACTER.speed;
    var justSmashed = false;
    for (zombie of ZOMBIES) {
      if (PLAYER_CHARACTER.x - 13 < zombie.x + 20 && PLAYER_CHARACTER.x + 13 > zombie.x && PLAYER_CHARACTER.y - 13 < zombie.y + 20 && PLAYER_CHARACTER.y + 13 > zombie.y) {
        justSmashed = true;
      }
    }
    if (justSmashed) {

      PLAYER_CHARACTER.y -= PLAYER_CHARACTER.speed //* Math.cos(PLAYER_CHARACTER.theta);
      //PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed * Math.sin(PLAYER_CHARACTER.theta);
    }
  }
  if (CONTROLS.playerCharacter.left) {
    PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed;
    var justSmashed = false;
    for (zombie of ZOMBIES) {
      if (PLAYER_CHARACTER.x - 13 < zombie.x + 20 && PLAYER_CHARACTER.x + 13 > zombie.x && PLAYER_CHARACTER.y - 13 < zombie.y + 20 && PLAYER_CHARACTER.y + 13 > zombie.y) {
        justSmashed = true;
      }
    }
    if (justSmashed) {

      PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed //* Math.cos(PLAYER_CHARACTER.theta);
      //  PLAYER_CHARACTER.y += PLAYER_CHARACTER.speed * Math.sin(PLAYER_CHARACTER.theta);
    }
  }
  if (CONTROLS.playerCharacter.right) {
    PLAYER_CHARACTER.x += PLAYER_CHARACTER.speed;
    var justSmashed = false;
    for (zombie of ZOMBIES) {
      if (PLAYER_CHARACTER.x - 13 < zombie.x + 20 && PLAYER_CHARACTER.x + 13 > zombie.x && PLAYER_CHARACTER.y - 13 < zombie.y + 20 && PLAYER_CHARACTER.y + 13 > zombie.y) {
        justSmashed = true;
      }
    }
    if (justSmashed) {

      PLAYER_CHARACTER.x -= PLAYER_CHARACTER.speed // * Math.cos(PLAYER_CHARACTER.theta);
      //PLAYER_CHARACTER.y -= PLAYER_CHARACTER.speed * Math.sin(PLAYER_CHARACTER.theta);

    }
  }
  //player may only attack if weapon isn't on cooldown, and if they aren't currently reloading.
  if (CONTROLS.playerCharacter.attack && aCooldown <= 0 && rCooldown <= 0 && WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip != 0) {
    aCooldown = WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].cooldown; //resets cooldown
    WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip--;
    attack();
  }
  //player can reload only if they aren't currently reloading
  if (CONTROLS.playerCharacter.reload && rCooldown <= 0 && WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoOwned > 0) {
    rCooldown = WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].reload;
    reload();
  }

  // Check if player is leaving the boundary, if so, stop it
  if (PLAYER_CHARACTER.x < 13) {
    PLAYER_CHARACTER.x = 13;
  }
  if (PLAYER_CHARACTER.x > GAME.canvas.width - 13) {
    PLAYER_CHARACTER.x = 587;
  }
  if (PLAYER_CHARACTER.y < 13) {
    PLAYER_CHARACTER.y = 13;
  }
  if (PLAYER_CHARACTER.y > GAME.canvas.height - 13) {
    PLAYER_CHARACTER.y = 287;
  }

  if (PLAYER_CHARACTER.hp <= 0) {
    GAME.started = false;
  }


  //checks if pc picks up dna
  for (var i = 0; i < DNA.length; i++) {
    if (PLAYER_CHARACTER.x + 20 > DNA[i].x && PLAYER_CHARACTER.x < DNA[i].x + 20 &&
      PLAYER_CHARACTER.y + 20 > DNA[i].y && PLAYER_CHARACTER.y < DNA[i].y + 20) {
      PLAYER_CHARACTER.dna++;
      dnaSound.play();
      DNA.splice(i, 1);
    }
  }
}

function handleBulletAnimation() {
  aCooldown--; //decrements attack cooldown
  rCooldown--; //decrements reload time
  for (var i = 0; i < BULLETS.length; i++) {
    //moves the bullet
    BULLETS[i].x += (BULLETS[i].speed) * Math.cos(BULLETS[i].angle);
    BULLETS[i].y += (BULLETS[i].speed) * Math.sin(BULLETS[i].angle);

    //detects collisions, decrements zombies hp if hit, removes bullet if its not piercing type
    for (var j = 0; j < ZOMBIES.length; j++) {
      if (BULLETS[i].x >= ZOMBIES[j].x && BULLETS[i].x <= ZOMBIES[j].x + 20 && BULLETS[i].y >= ZOMBIES[j].y && BULLETS[i].y < +ZOMBIES[j].y + 20) {
        ZOMBIES[j].hp -= BULLETS[i].damage;
        bulletHitSound.play();
        if (ZOMBIES[j].hp <= 0) {
          var luckNum = (Math.random() * 99) + 1;
          if (luckNum < PLAYER_CHARACTER.luck) {
            DNA.push({
              x: ZOMBIES[j].x,
              y: ZOMBIES[j].y
            });
          }
          ZOMBIES.splice(j, 1);
        }
        j--;

        if (!BULLETS[i].pierces) {
          j = ZOMBIES.length;
          BULLETS.splice(i, 1);
          i--;
        }
      }
    }
  }



  //removes bullets that have gone off screen to save memory
  for (var i = 0; i < BULLETS.length; i++) {
    if (BULLETS[i].x < 0) {
      BULLETS.splice(i, 1);
      i--;
    } else if (BULLETS[i].x > GAME.canvas.width) {
      BULLETS.splice(i, 1);
      i--;
    } else if (BULLETS[i].y < 0) {
      BULLETS.splice(i, 1);
      i--;
    } else if (BULLETS[i].y > GAME.canvas.height) {
      BULLETS.splice(i, 1);
      i--;
    }
  }
}

function RenderZombies(context) {
  //draws every zombie
  var canvas = document.getElementById('mainCanvas');
  var zomImage = new Image();
  zomImage.src = 'Sprites\\zombie head.jpg';
  for (zombie of ZOMBIES) {
    context.drawImage(zomImage, zombie.x, zombie.y, 20, 20);
  }
}

function RenderPC(context) {
  var canvas = document.getElementById('mainCanvas');
  var pcImage = new Image();
  pcImage.src = 'Sprites\\character 1 face.png';
  //this is where the flamethrower flames are drawn. theyre here cuz im lazy and i wanted them to be under the player and the weapon but didnt want to write another function
  if (PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn] == 3 && CONTROLS.playerCharacter.attack && aCooldown <= 0 && rCooldown <= 0 && WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].ammoLeftInClip != 0) {
    var lowerRange = PLAYER_CHARACTER.theta - (WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].angle * Math.PI / 180);
    var upperRange = PLAYER_CHARACTER.theta + (WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].angle * Math.PI / 180);
    var rand = Math.random();
    if (rand < .2) {
      context.fillStyle = "#FF0000";
    } else if (rand < .4) {
      context.fillStyle = "#FF5a00";
    } else if (rand < .6) {
      context.fillStyle = "#FF9a00";
    } else if (rand < .8) {
      context.fillStyle = "#FFce00";
    } else {
      context.fillStyle = "#FFe808";
    }
    context.beginPath()
    context.moveTo(PLAYER_CHARACTER.x, PLAYER_CHARACTER.y);
    context.lineTo(PLAYER_CHARACTER.x + (150 * Math.cos(lowerRange)), PLAYER_CHARACTER.y + (150 * Math.sin(lowerRange)));
    context.arc(PLAYER_CHARACTER.x, PLAYER_CHARACTER.y, 150, lowerRange, upperRange, false);
    context.lineTo(PLAYER_CHARACTER.x, PLAYER_CHARACTER.y);
    context.fill();
    context.fillStyle = "#000000";
  }
  //this draws the player
  drawRotatedImage(context, pcImage, PLAYER_CHARACTER.x, PLAYER_CHARACTER.y, 26, 26, PLAYER_CHARACTER.theta);

}

function RenderBullets(context) {
  //draws all the bullets
  var canvas = document.getElementById('mainCanvas');
  for (bullet of BULLETS) {
    context.fillRect(bullet.x, bullet.y, 2, 2);
  }
}

function drawRotatedImage(context, image, x, y, width, height, angle) {
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
  //To make this function work for top left, change translate(x, y) to translate(x+width/2, y+height/2)
  //Then, make the drawImage(image, 0, 0, width, height);
}

function RenderWeapon(context) {
  var canvas = document.getElementById('mainCanvas');
  var weaponImage = new Image();

  //why is this where weapon switching happens? who tf knows
  if (wSwitchCooldown <= 0 && CONTROLS.playerCharacter.pickWeapon) {
    PLAYER_CHARACTER.wepOn++;
    if (PLAYER_CHARACTER.wepOn == 3) {
      PLAYER_CHARACTER.wepOn = 0;
    }
    wSwitchCooldown = 30;
  }
  wSwitchCooldown--;

  //this part decided which weapon picture to show on the screen
  weaponImage.src = WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].image;
  if (WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].class == "melee" && aCooldown > 0) {
    weaponImage.src = WEAPONS[PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn]].fimage;

  }
  //draws weapon in topleft
  context.drawImage(weaponImage, 100, 2, 15, 15);

  //draws the player's weapon

  drawRotatedImage(context, weaponImage, PLAYER_CHARACTER.x + 15 * Math.cos(PLAYER_CHARACTER.theta), PLAYER_CHARACTER.y + 15 * Math.sin(PLAYER_CHARACTER.theta), 20, 20, PLAYER_CHARACTER.theta);

}

function RenderDNA(context) {
  /*for (dna of DNA){
    context.fillRect(dna.x,dna.y,20,20);
  }*/
  var dnaImage = new Image();
  dnaImage.src = 'Sprites\\dna.png';
  for (dna of DNA) {
    context.drawImage(dnaImage, dna.x, dna.y, 20, 20);
  }
}

function drawShopStuff(context) {
  for (var i = 0; i < WEAPONS.length - 1; i++) {
    drawShopItem(context, WEAPONS[i]);
  }
  for (var i = 0; i < PLAYER_CHARACTER.weapons.length; i++) {
    drawInventItem(context, WEAPONS[PLAYER_CHARACTER.weapons[i]], i);
  }
  for (var i = 0; i < TRAITS.length; i++) {
    drawShopItem(context, TRAITS[i]);
  }
}

function drawShopItem(context, item) {
  context.beginPath();
  context.rect(item.shopXpos, item.shopYpos, 50 * item.shopSize, 50 * item.shopSize);
  context.stroke();
  var itemImage = new Image();
  itemImage.src = item.image;
  context.drawImage(itemImage, item.shopXpos, item.shopYpos, 50 * item.shopSize, 50 * item.shopSize);
  if (item.shopSize == 1) {
    if (!item.owned) {
      context.fillText("" + item.name + ": " + item.cost + " DNA", item.shopXpos, item.shopYpos + 60 * item.shopSize);
    } else {
      context.fillText("" + item.name + ": OWNED", item.shopXpos, item.shopYpos + 60 * item.shopSize);

    }

    if (item.ammoLeftInClip > -1) {
      context.beginPath();
      context.rect(item.shopXpos, 70 + item.shopYpos, 50 * item.shopSize, 20 * item.shopSize);
      context.stroke();
      var ammoImage = new Image();
      ammoImage.src = 'Sprites\\ammopic.png';
      context.drawImage(ammoImage, item.shopXpos, 70 + item.shopYpos, 50 * item.shopSize, 20 * item.shopSize);
      context.fillText("Ammo: 1 DNA", item.shopXpos, item.shopYpos + 100 * item.shopSize);
    }
  } else {
    context.font = "8px Ariel";
    if (item.level < 7) {
      context.fillText("" + item.name + " " + (item.level + 1), item.shopXpos, item.shopYpos + 65 * item.shopSize);
      context.fillText("Cost: " + COSTS[item.level - 1] + " DNA", item.shopXpos, item.shopYpos + 80 * item.shopSize);
    } else {
      context.fillText("" + item.name + " MAX", item.shopXpos, item.shopYpos + 65 * item.shopSize);

    }
    context.font = "10px Ariel";
  }
}

function drawInventItem(context, item, i) {
  if (i == highlighted) {
    context.fillStyle = "#FF0000";
    context.fillRect(525, 25 + 60 * i, 50 * item.shopSize, 50 * item.shopSize);
    context.fillStyle = "#000000";

  } else {
    context.beginPath();
    context.rect(525, 25 + 60 * i, 50 * item.shopSize, 50 * item.shopSize);
    context.stroke();
  }
  var itemImage = new Image();
  itemImage.src = item.image;
  context.drawImage(itemImage, 525, 25 + 60 * i, 50 * item.shopSize, 50 * item.shopSize);
}

function handleShopping(context) {
  if (CONTROLS.shop.click) {
    for (var i = 0; i < WEAPONS.length - 1; i++) {
      if (WEAPONS[i].shopXpos < CONTROLS.shop.mouseX && CONTROLS.shop.mouseX < WEAPONS[i].shopXpos + 50 * WEAPONS[i].shopSize && WEAPONS[i].shopYpos < CONTROLS.shop.mouseY && CONTROLS.shop.mouseY < WEAPONS[i].shopYpos + 50 * WEAPONS[i].shopSize) {
        if (WEAPONS[i].owned) {
          PLAYER_CHARACTER.weapons[highlighted] = i;
          highlighted++;
          if (highlighted == PLAYER_CHARACTER.weapons.length) {
            highlighted = 0;
          }
        } else if (PLAYER_CHARACTER.dna >= WEAPONS[i].cost) {
          WEAPONS[i].owned = true;
          buySound.play();
          PLAYER_CHARACTER.dna -= WEAPONS[i].cost;
        }
      }
      if (WEAPONS[i].ammoLeftInClip > -1) {
        if (WEAPONS[i].shopXpos < CONTROLS.shop.mouseX && CONTROLS.shop.mouseX < WEAPONS[i].shopXpos + 50 * WEAPONS[i].shopSize && WEAPONS[i].shopYpos + 70 < CONTROLS.shop.mouseY && CONTROLS.shop.mouseY < 70 + WEAPONS[i].shopYpos + 20 * WEAPONS[i].shopSize) {
          if (PLAYER_CHARACTER.dna >= 1) {
            PLAYER_CHARACTER.dna--;
            WEAPONS[i].ammoOwned += WEAPONS[i].clipSize;
          }
        }
      }
    }
    for (var i = 0; i < TRAITS.length; i++) {
      if (TRAITS[i].shopXpos < CONTROLS.shop.mouseX && CONTROLS.shop.mouseX < TRAITS[i].shopXpos + 50 * TRAITS[i].shopSize && TRAITS[i].shopYpos < CONTROLS.shop.mouseY && CONTROLS.shop.mouseY < TRAITS[i].shopYpos + 50 * TRAITS[i].shopSize) {
        if (PLAYER_CHARACTER.dna >= COSTS[TRAITS[i].level-1]&&COSTS[TRAITS[i].level-1]>0) {
          PLAYER_CHARACTER.dna -= COSTS[TRAITS[i].level-1];
          TRAITS[i].level++;
          switch (TRAITS[i].name){
            case "Strength":
            PLAYER_CHARACTER.strength = TRAITS[i].track[TRAITS[i].level-1];
            break;
            case "Speed":
            PLAYER_CHARACTER.speed = 2*TRAITS[i].track[TRAITS[i].level-1];
            break;
            case "HP":
            PLAYER_CHARACTER.baseHP = TRAITS[i].track[TRAITS[i].level-1];
            break;
            case "Luck":
            PLAYER_CHARACTER.luck = TRAITS[i].track[TRAITS[i].level-1];
            break;
            default:
            break;
          }
        }
      }
    }
  }
}


function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (!beginGame){
    context.font = "40px Arial";
    context.fillText("Zombie Smash", 135, 100);
    context.font = "14px Arial";
    context.fillText("[W][A][S][D] to move, [Q][E] to rotate, [Space] to attack, [R] to reload, [P] to switch weapons", 20, 200);
    context.fillText("(In Shop: Click to buy, click an owned weapon to equip it to the red slot. [Enter] to leave)", 20, 240);
    context.fillText("[Space] to start", 20, 280);
    if (CONTROLS.playerCharacter.attack){
      beginGame=true;
    }
  }else{

  if (GAME.started) {
    if ((GAME.levelTime >= 0 || ZOMBIES.length > 0 || DNA.length > 0) && PLAYER_CHARACTER.hp > 0) {
      // 1 - Reposition the objects
      hasntWon = true;
      handlePCAnimation();
      handleBulletAnimation();
      handleZombieAnimation();
      // 2 - Clear the CANVAS
      context.clearRect(0, 0, 600, 300);

      // 3 - Draw new items
      RenderPC(context);
      RenderWeapon(context);
      RenderZombies(context);
      RenderBullets(context);
      RenderDNA(context);
      context.font = "10px Arial";

      //this stuff writes all the stats in the topleft
      if (WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].clipSize == -1) {
        context.fillText("HP: " + PLAYER_CHARACTER.hp + "  DNA: " + PLAYER_CHARACTER.dna, 10, 15);
        context.fillText("∞/∞", 120, 15)
      } else {
        context.fillText("HP: " + PLAYER_CHARACTER.hp + "  DNA: " + PLAYER_CHARACTER.dna , 10, 15);
        context.fillText(WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].ammoLeftInClip + "/" + WEAPONS[(PLAYER_CHARACTER.weapons[PLAYER_CHARACTER.wepOn])].ammoOwned, 120, 15);

      }
      context.font = "30px Arial";
      context.fillText("Level "+GAME.level, 250, 30);
      if (GAME.levelTime>0){
        context.fillText(Math.trunc(GAME.levelTime/60), 550, 30);
      }
      else{
        context.fillText("0", 550, 30);
      }
      context.font = "10px Arial";

    } else if (PLAYER_CHARACTER.hp <= 0) {
      context.font = "30px Arial";
      context.fillText("Game Over", 135, 200);
      if (hasntWon){
        loseSound.play();
        hasntWon=false;
}
      }
     else {
       if (hasntWon){
         winSound.play();
         hasntWon=false;
 }
      context.clearRect(0, 0, 600, 300)

      drawShopStuff(context);
      context.font = "20px Arial";
      context.fillText("DNA: " + PLAYER_CHARACTER.dna, 10, 30);
      context.font = "10px Arial";
      handleShopping(context);

      if (CONTROLS.shop.nextLevel){
        CONTROLS.shop.nextLevel=false;
        CONTROLS.shop.click=false;
        GAME.level++;
        GAME.levelTime=3600;
        PLAYER_CHARACTER.hp=PLAYER_CHARACTER.baseHP;
        GAME.zombiesInc= 15+ Math.trunc(Math.random()*10) + 5*GAME.level;
        PLAYER_CHARACTER.x=300;
        PLAYER_CHARACTER.y=150;
        PLAYER_CHARACTER.theta=0;
      }
    }
    CONTROLS.shop.click = false;
  }
}
  window.requestAnimationFrame(runGame);
}



window.requestAnimationFrame(runGame);
