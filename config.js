var GAME = {
  canvas : {
    width : 600,
    height : 300
  },
  started : true,
  level : 1
};


var PLAYER_CHARACTER = {
  initialized : false,
  latest : {
    x : 50,
    y : 50,
    v: 0,
    a: .06,
  },
    dna: 0,
    strength: 1,
    speed: 1,
    hp: 100,
    luck: 10
};

var WEAPON = {
  x:310,
  y:150
  // class:
  // cooldown:
  // clipSize:
  // ammoOwned:
  // ammoLeft:
  // damage:
}
