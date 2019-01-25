/* Chip class is used to calculate and store the positions and offsets
    of chips such as main chip, switch chip, and message board chip*/
import {bottomSide, topSide, leftSide, rightSide, leftCenterSide} from '../js/path.js';
import { distance } from './utils.js';

const second = 2;
const fps = 60;
const lambda = second * fps;
const gravity = 0.6;

var canvas = document.getElementById('canvas1');
var c = canvas.getContext('2d');
c.fillStyle = "rgba(1, 1, 1, 0.2)";

const initialSpeedX = 8;
const initialSpeedY = 6;
const balanceSpeed = 1;
const resistance = 0.1;
const explosionParts = 5;

/* other settings */
const particleColor = "gold";
const particleRadius = 1;
const particleBounceTimes = 1;

class Chip {
    /* id is passed as parameter to determine if is is main chip, 
        switch chip, or message board chip*/
    constructor(id) {
        this.id = id;
        this.setOffset();
        this.setRelativeOffset();
        this.setCorner();
    }

    /* getOffset get the offset, width, and height of that chip */
    setOffset(id = this.id) {
        this.border = 25;
        this.offset = $('#' + id).offset();
        this.width = $('#' + id).width();
        this.height = $('#' + id).height();
    }

    /* getRelativeOffset get the border position of each chip. */
    // Relative to Parent, not to screen. left, right, top, and bottom
    setRelativeOffset(offset = this.offset) {
        this.left = offset.left;
        this.right = this.left + this.width;
        this.top = offset.top;
        this.bottom = this.top + this.height;
        // console.log(this.left + " "+ this.right);
    }

    /* getCorner get the corner's position as a Point */
    setCorner() {
        this.topLeft = new Point(this.left, this.top);
        this.topRight = new Point(this.right, this.top);
        this.botLeft = new Point(this.left, this.bottom);
        this.botRight = new Point(this.right, this.bottom);
    }
}

class Circuit{
    constructor(chip, config){
        this.chip = chip;
        this.config = config;
        this.paths = [];
        this.pathsSparking = [];
        this.dashesSparking = [];
        this.randomPaths = [];
        this.randomPathsReverse = [];
        this.setSides();
    }

    setSides(){
        bottomSide.init(this.chip, this.config);
        this.paths.push(bottomSide.paths);
        this.pathsSparking.push(bottomSide.pathSparking);
        this.dashesSparking.push(bottomSide.dashSparking);

        topSide.init(this.chip, this.config);
        this.paths.push(topSide.paths);

        leftSide.init(this.chip, this.config);
        this.paths.push(leftSide.paths);
        this.pathsSparking.push(leftSide.pathSparking);
        this.dashesSparking.push(leftSide.dashSparking);

        rightSide.init(this.chip, this.config);
        this.paths.push(rightSide.paths);
        this.pathsSparking.push(rightSide.pathSparking);
        this.dashesSparking.push(rightSide.dashSparking);



        leftCenterSide.init(this.chip, this.config);
        this.randomPaths.push(leftCenterSide.paths);
        this.randomPathsReverse.push(leftCenterSide.pathsReverse);
    }
}

class Config {
    constructor() {
        this.screenWidth = $(window).width();
        this.screenHeight = $(window).height();
        this.strokeWidth = 5;
        this.division = 9;
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = this.screenWidth ;
        this.canvas.height = this.screenHeight;
        this.c = this.canvas.getContext('2d');
        this.c.fillStyle = "rgba(1, 1, 1, 0.2)";
    }
}

/* Point class contains x, y, and toString() */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return this.x + "," + this.y;
    }
}

class Path{
    constructor(points, length, brightness, moveCircleH, moveCircleV, slopeFix){
        this.points = points;
        this.length = length;
        this.brightness = brightness;
        this.moveCircleH = moveCircleH;
        this.moveCircleV = moveCircleV;
        this.slopeFix = slopeFix;
    }

    toString() {
        return this.length+" "+this.points;
    }
}

class Explosion {
    constructor(cannonball) {
        this.particles = [];
        this.rings = [];
        this.source = cannonball;
        this.init();
    }
    init() {
        for (var i = 0; i < explosionParts; i++) {
            var dx = (Math.random() * initialSpeedX) - initialSpeedX/2;
            var dy = (Math.random() * initialSpeedY) - initialSpeedY/2;
            var radius = Math.random() * 0.8 + particleRadius;
            this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, radius, particleColor));
        }
    };

    update() {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();

            // Remove particles from scene one time to live is up
            if (this.particles[i].timeToLive < 0) {
                this.particles.splice(i, 1);
            }
        }
    };
}

class Particle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = -dy;
        this.radius = radius;
        this.color = color;
        this.timeToLive = particleBounceTimes;
        this.mass = Math.pow(radius, 3) / 10;
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -(this.dy) / 5;
            this.timeToLive--;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx;
        }
        if (this.dx > balanceSpeed) {
            this.dx -= resistance;
        } else if (this.dx < -balanceSpeed) {
            this.dx += resistance;
        }
        this.dy += gravity * this.mass;
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    };
}

class Cannonball {
    constructor(x, y, radius, color, points, dash) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.points = points;
        this.dash = dash;
        this.destroy = false;
        this.init();
    }

    init() {
        // Initialize the cannonballs start coordinates (from muzzle of cannon)
        this.currIndex = 0;
        this.lastIndex = this.points.length - 1;
        this.x = this.points[0].x;
        this.y = this.points[0].y;
        this.d = distance(this.points[this.currIndex + 1], this.points[this.currIndex]);
        this.dx = (this.points[this.currIndex + 1].x - this.points[this.currIndex].x) * (this.dash / this.d) / lambda;
        this.dy = (this.points[this.currIndex + 1].y - this.points[this.currIndex].y) * (this.dash / this.d) / lambda;
    };

    update(points = this.points) {
        if (this.currIndex < this.lastIndex) {
            if (Math.abs(this.x - points[this.currIndex + 1].x) > 2 ||
                Math.abs(this.y - points[this.currIndex + 1].y) > 2) {
                //nothing
            } else {
                this.currIndex += 1;
                if (this.currIndex < this.lastIndex) {
                    this.d = distance(points[this.currIndex + 1], points[this.currIndex]);
                    this.dx = (points[this.currIndex + 1].x - points[this.currIndex].x) * (this.dash / this.d) / lambda;
                    this.dy = (points[this.currIndex + 1].y - points[this.currIndex].y) * (this.dash / this.d) / lambda;
                }
            }
        } else {
            this.destroy = true;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    };
}

export { Chip, Config, Point, Path, Explosion, Particle, Cannonball, Circuit };