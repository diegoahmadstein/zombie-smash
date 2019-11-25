var GAME = {
  canvas : {
    width : 600,
    height : 300
  },
  started : true,
  level : 1, //should increment. When it does, set zombiesInc to 20 + Math.trunc(Math.random()*10) + 5*Game.level
  inLevel: true, //this can become false as a condition to go to shop? idk i thought it would be helpful
  levelTime: 3600, //decrements to 0. After 0, zombies stop spawning
  zombiesInc: 20+ Math.trunc(Math.random()*10)
};


var PLAYER_CHARACTER = {
  initialized : false,
    x: 300, //MEASURES FROM CENTER OF PLAYER
    y: 150, //MEASURES FROM CENTER OF PLAYER
    dna: 0, //how much currency the player has
    //a bunch of stats discribed in the readme
    strength: 1,
    speed: 2,
    baseHP: 100,
    hp: 100,
    luck: 40,
    theta: 0, //the player's angle with the positive x axis
    wepOn: 0, // which of the three equipped weapons the player is using
    weapons: [0, 7, 7] //which three weapons the player has equipped
};

//this is just a huge stat block for the various weapons
var WEAPONS = [
  {cost: 0, owned: true, shopXpos:50, shopYpos:50, shopSize:1, fimage: 'Sprites\\fclub.png', image: 'Sprites\\club.png', name: "Club", class: "melee", cooldown: 60, angle: 45, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 50*PLAYER_CHARACTER.strength, knockback: 30},
  {cost: 3, owned: false, shopXpos:150, shopYpos:50, shopSize:1, fimage: 'Sprites\\fkatana.png', image: 'Sprites\\katana.png', name: "Katana", class : "melee", cooldown: 42, angle: 50, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 104*PLAYER_CHARACTER.strength, knockback: 20},
  {cost: 10, owned: false, shopXpos:250, shopYpos:50, shopSize:1, image: 'Sprites\\handgun.png', name: "Handgun", class: "ranged", bulletSpeed: 10, cooldown: 30, clipSize: 10, ammoOwned: 500, ammoLeftInClip: 10, damage: 50*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {cost: 20, owned: false, shopXpos:350, shopYpos:50, shopSize:1, image: 'Sprites\\flamethrower.png', name: "Flamethrower", class: "melee", cooldown: 1, angle: 22.5, clipSize: 500, ammoOwned: 1000, ammoLeftInClip: 500, damage: 2*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {cost: 25, owned: false, shopXpos:50, shopYpos:180, shopSize:1, image: 'Sprites\\semiauto.png', name: "Semiauto", class: "ranged", bulletSpeed: 10, cooldown: 6, clipSize: 100, ammoOwned: 500, ammoLeftInClip: 100, damage: 20*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {cost: 25, owned: false, shopXpos:150, shopYpos:180, shopSize:1, image: 'Sprites\\sniperrifle.png', name: "Sniper", class: "ranged", cooldown: 90, bulletSpeed: 15, clipSize: 5, ammoOwned: 25, ammoLeftInClip: 5, damage: 130*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 40, reload: 180},
  {cost: 100, owned: false, shopXpos:250, shopYpos:180, shopSize:1, fimage: 'Sprites\\fexcalibur.png', image: 'Sprites\\excalibur.png', name: "Excalibur", class: "melee", cooldown: 30, angle: 67.5, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 200*PLAYER_CHARACTER.strength*PLAYER_CHARACTER.strength , knockback: 60},
  {cost: 1, owned: true, shopXpos:350, shopYpos:180, shopSize:1, image: '', name: "", class: "melee", bulletSpeed: 0, cooldown: 0, clipSize: 0, ammoOwned: 0, ammoLeftInClip: 0, damage: 0, knockback: 0, reload: 0}
];

var TRAITS= [
{track : [1, 1.05, 1.1025, 1.212, 1.334, 1.667, 2.5], name: "Strength", image:'Sprites\\arm.png', shopXpos:380, shopYpos:240, shopSize:.6, level: 1},
{track : [1, 1.05, 1.1025, 1.212, 1.334, 1.667, 2], name: "Speed", image:'Sprites\\shoe.png', shopXpos:430, shopYpos:240, shopSize:.6, level: 1},
{track : [100, 110, 120, 140, 200, 250, 400], name: "HP", image:'Sprites\\heart.png', shopXpos:480, shopYpos:240, shopSize:.6, level: 1},
{track : [40, 45, 50, 60, 70, 80, 100], name: "Luck", image:'Sprites\\dna.png', shopXpos:530, shopYpos:240, shopSize:.6, level: 1}
]

var COSTS= [2,3,5,8,10,20, -1];

//zombie positions measure from top left corner. DIFFERENT FROM PLAYER
var ZOMBIES = [];
//holds dna
var DNA= [];
//holds all the bullets
var BULLETS = [];
