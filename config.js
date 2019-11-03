var GAME = {
  canvas : {
    width : 600,
    height : 300
  },
  started : true,
  level : 1,
  inLevel: true,
  levelTime: 7200,
  zombiesInc: 25+ Math.trunc(Math.random()*10)
};


var PLAYER_CHARACTER = {
  initialized : false,
    dna: 0,
    strength: 1,
    speed: 2,
    hp: 100,
    luck: 10,
    theta: 0,
    wepOn: 0,
    weapons: [0, 0, 0],
    selectedWeapon: 0
};

var WEAPONS = [
  {name: "Club", class: "melee", cooldown: 60, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 20*PLAYER_CHARACTER.strength, knockback: 20},
  {name: "Katana", class : "melee", cooldown: 42, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 25*PLAYER_CHARACTER.strength, knockback: 20},
  {name: "Handgun", class: "ranged", cooldown: 30, clipSize: 10, ammoOwned: 0, ammoLeftInClip: 0, damage: 35*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Flamethrower", class: "melee", cooldown: 1, clipSize: 500, ammoOwned: 0, ammoLeftInClip: 0, damage: .5*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Semiautomatic", class: "ranged", cooldown: 6, clipSize: 100, ammoOwned: 0, ammoLeftInClip: 0, damage: 20*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 0, reload: 120},
  {name: "Sniper", class: "ranged", cooldown: 60, clipSize: 5, ammoOwned: 0, ammoLeftInClip: 0, damage: 100*Math.sqrt(PLAYER_CHARACTER.strength), knockback: 40, reload: 60},
  {name: "Excalibur", class: "melee", cooldown: 30, clipSize: -1, ammoOwned: -1, ammoLeftInClip: -1, damage: 100*PLAYER_CHARACTER.strength*PLAYER_CHARACTER.strength , knockback: 20}
];
