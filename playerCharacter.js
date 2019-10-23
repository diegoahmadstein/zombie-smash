// Populate a global variable for the spaceship
function InitializePC() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);

  var pcImage = new Image();
  pcImage.src = "character 1 face.png";


  PLAYER_CHARACTER = {
    x : 300,
    y : 150,
    rotation : 0,
    health : 3,
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
        x : PLAYER_CHARACTER.x,
        y : PLAYER_CHARACTER.y,
    },
    scale : 5,
    speed : 3,
    initialized : true,
    bullets : []
  };
}

// Rotate rotates a point around
// cx, cy   :   The central point
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function Rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

// RotateAroundOrigin
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function RotateAroundOrigin(x, y, angle) {
  return Rotate(0, 0, x, y, angle);
}

/**  RenderSpaceship
 *
 *  Renders all spaceship points after adjusting them for the rotation and position
 *    in space
 */
function RenderPC(context) {
  if (!PLAYER_CHARACTER.initialized) {
    return;
  }

  // Move to the point where drawing will start
  var rotatedPoint = RotateAroundOrigin(
    PLAYER_CHARACTER.positions[0].x,
    PLAYER_CHARACTER.positions[0].y,
    PLAYER_CHARACTER.rotation
  );
  context.moveTo(PLAYER_CHARACTER.x + rotatedPoint[0],PLAYER_CHARACTER.y +  rotatedPoint[1]);
  PLAYER_CHARACTER.latest.x = PLAYER_CHARACTER.x + rotatedPoint[0];
  PLAYER_CHARACTER.latest.y = PLAYER_CHARACTER.y + rotatedPoint[1];
  // Begin rendering the space ship points (rotating them each time)
  context.beginPath();
  for (var i = 0; i < PLAYER_CHARACTER.positions.length; i++) {
    var rotatedPoint = RotateAroundOrigin(
      PLAYER_CHARACTER.positions[i].x,
      PLAYER_CHARACTER.positions[i].y,
      PLAYER_CHARACTER.rotation
    );
    context.lineTo(
      PLAYER_CHARACTER.x + (rotatedPoint[0] * PLAYER_CHARACTER.scale),
      PLAYER_CHARACTER.y + (rotatedPoint[1] * PLAYER_CHARACTER.scale)
    );
  }
  context.lineWidth = 1;
  switch (PLAYER_CHARACTER.health) {
    case 3:
      context.strokeStyle = 'green';
      break;
    case 2:
      context.strokeStyle = 'blue';
      break;
    case 1:
      context.strokeStyle = 'orange';
      break;
    case 0:
      context.strokeStyle = 'red';
      break;
    default:
      context.strokeStyle = 'white';
      break;
  }
  context.stroke();
}
