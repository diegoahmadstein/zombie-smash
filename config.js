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
  }
};
