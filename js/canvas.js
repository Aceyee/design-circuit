/**
 *  Name: canvas.js
 *  Author: Zihan Ye
 *  Description: draw lines, circles, and poligons on canvas element
 */

/******************************* Constant *********************************/
/* style settings */
const strokeWidth = 5;
const cannonballColor = "aqua";

/* physical settings */
const second = 2;
const fps = 60;
const lambda = second * fps;
const period = 10;
const gravity = 0.6;

/* explosion settings */
const initialSpeedX = 8;
const initialSpeedY = 6;
const balanceSpeed = 1;
const resistance = 0.1;
const explosionParts = 5;

/* other settings */
const particleColor = "gold";
const particleRadius = 1;
const particleBounceTimes = 1;
/******************************* Constant End *****************************/



/******************************* Variables ********************************/
// store all pre-defined points in an array
var pointsArrayIntro = [];
var dashArrayIntro = [];

// store all reverse dynamic points in an array
var pathIntro = [];
var pathRandom = [];
var pathRandomReverse = [];

//get screen height and screen width
var screenWidth = $(window).width();
var screenHeight = $(window).height();

/* get the svg elements on block1*/
var svg1 = document.getElementById("svg1"); // get svg1 element
var svg1after = document.getElementById("svg1after"); // get svg1 after element

/* get the svg element on block2*/
var svg2 = document.getElementById("svg2"); // get svg1 element

/* get the svg element on block2*/
var svg3 = document.getElementById("svg3"); // get svg1 element

// create new Chip class: chipMain
var chipMain = new Chip('chipMain', 0);

// divide the width by 9 for drawing socket (circle)
var division = 9;
var deltaChipMainX = chipMain.width / division;

var canvas = document.getElementById('canvas1');
canvas.width = screenWidth;
canvas.height = screenHeight;
var c = canvas.getContext('2d');
c.fillStyle = "rgba(1, 1, 1, 0.2)";

var cannonballs = [];
var explosions = [];
var input = false;
var end = false;
var count = 0;
/******************************* Variables End ******************************/



/******************************* Initialize Path ****************************/
// initialize paths for introduction animations on block1
bottomSide.init();
leftSide.init();
rightSide.init();
topSide.init();

// initialize paths for after-introduction random animations
leftCenterSide.init();
leftBottomSide.init();
rightCenterSide.init();
rightBottomSide.init();
/**************************** Initialize Path End ***************************/



/*************************** Draw Canvas and SVG ****************************/

for(let i=0; i<pathIntro.length; i++){
  let path = pathIntro[i];
  drawVertices(svg1, path.points, path.length, path.brightness, 
      path.moveCircleH, path.moveCircleV, path.slopeFix);
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillRect(0, 0, canvas.width, canvas.height);

  if (!end) {
    for (let i = 0; i < pointsArrayIntro.length; i++) {
      cannonballs.push(new Cannonball(canvas.width / 2, canvas.height / 2, 2, cannonballColor, pointsArrayIntro[i], dashArrayIntro[i]));
    }
  }
  end = true;

  //update cannonbals, and create new Explosion after every period
  for (let i = 0; i < cannonballs.length; i++) {
    cannonballs[i].update();
    if (count % period == 0) {
      explosions.push(new Explosion(cannonballs[i]));
    }
    if (cannonballs[i].destroy) {
      cannonballs.splice(i, 1);
    }
  }

  //update explosions, each explosion will create several particles,
  //if all partcicles are done, delete this explosion
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    if (explosions[i].particles.length <= 0) {
      explosions.splice(i, 1);
    }
  }

  if (explosions.length <= 0) {
    if (cannonballs.length < 3) {
      $(svg1after).empty();
      let index = Math.floor(Math.random() * 4);
      for (let i = 0; i < 3; i++) {
        let path = pathRandom[index][i];
        cannonballs.push(new Cannonball(canvas.width / 2, canvas.height / 2, 2, cannonballColor, path.points, path.length));
        drawVerticesAfter(svg1after, path.points, path.length, "bright", path.moveCircleH, path.moveCircleV, path.slopeFix, false);
      }
      input = true;
    }
  }

  if (input) {
    if (cannonballs.length < 3) {
      let index = Math.floor(Math.random() * 4);
      for (let i = 0; i < 3; i++) {
        let path = pathRandomReverse[index][i];
        cannonballs.push(new Cannonball(canvas.width / 2, canvas.height / 2, 2, cannonballColor, path.points, path.length));
        drawVerticesAfter(svg1after, path.points, path.length, "bright", path.moveCircleH, path.moveCircleV, path.slopeFix, true);
      }
      input = false;
    }
  }

  if (count < 1000) {
    count++;
  } else {
    count = 0;
  }
}
animate();
/************************ Draw Canvas and SVG End ***************************/
