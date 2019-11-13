var GAME = {
  canvas : {
    width : 600,
    height : 300
  },
  started : true,
  level : 1, //should increment. When it does, set zombiesInc to 20 + Math.trunc(Math.random()*10) + 5*Game.level
  inLevel: true, //this can become false as a condition to go to shop? idk i thought it would be helpful
  levelTime: 7200, //decrements to 0. After 0, zombies stop spawning
  zombiesInc: 25+ Math.trunc(Math.random()*10)
};


var PLAYER_CHARACTER = {
  initialized : false,
    x: 300, //MEASURES FROM CENTER OF PLAYER
    y: 150, //MEASURES FROM CENTER OF PLAYER
    dna: 0, //how much currency the player has
    //a bunch of stats discribed in the readme
    strength: 1,
    speed: 2,
    hp: 100,
    luck: 10,
    theta: 0, //the player's angle with the positive x axis
    wepOn: 0, // which of the three equipped weapons the player is using
    weapons: [0, 2, 4] //which three weapons the player has equipped
};

//this is just a huge stat block for the various weapons
var WEAPONS = [
  {name: "Club", class: "melee", cooldown: 60, angle: 45, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 25*PLAYER_CHARACTER.strength, knockback: 20},
  {name: "Katana", class : "melee", cooldown: 42, angle: 50, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 30*PLAYER_CHARACTER.strength, knockback: 20},
  {name: "Handgun", class: "ranged", bulletSpeed: 10, cooldown: 30, clipSize: 10, ammoOwned: 100, ammoLeftInClip: 0, damage: 35*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Flamethrower", class: "melee", cooldown: 1, angle: 22.5, clipSize: 500, ammoOwned: 1000, ammoLeftInClip: 0, damage: 2*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Semiautomatic", class: "ranged", bulletSpeed: 10, cooldown: 6, clipSize: 100, ammoOwned: 500, ammoLeftInClip: 0, damage: 20*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Sniper", class: "ranged", cooldown: 60, bulletSpeed: 15, clipSize: 5, ammoOwned: 25, ammoLeftInClip: 0, damage: 102*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 40, reload: 60},
  {name: "Excalibur", class: "melee", cooldown: 30, angle: 67.5, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 102*PLAYER_CHARACTER.strength*PLAYER_CHARACTER.strength , knockback: 20}
];


//zombie positions measure from top left corner. DIFFERENT FROM PLAYER
var ZOMBIES = [];

//holds all the bullets
var BULLETS = [];
