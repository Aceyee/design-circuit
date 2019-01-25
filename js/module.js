/* Chip class is used to calculate and store the positions and offsets
    of chips such as main chip, switch chip, and message board chip*/

import {drawVertices, drawVerticesAfter} from '../js/utils.js';
import {bottomSide} from '../js/path.js';

class Chip {
    /* id is passed as parameter to determine if is is main chip, 
        switch chip, or message board chip*/
    constructor(id) {
        this.id = id;
        this.getOffset();
    }

    /* getOffset get the offset, width, and height of that chip */
    getOffset(id = this.id) {
        this.border = 25;
        this.offset = $('#' + id).offset();
        this.width = $('#' + id).width();
        this.height = $('#' + id).height();
        this.getRelativeOffset();
    }

    /* getRelativeOffset get the border position of each chip. */
    // Relative to Parent, not to screen. left, right, top, and bottom
    getRelativeOffset(offset = this.offset) {
        this.left = offset.left;
        this.right = this.left + this.width;
        this.top = offset.top;
        this.bottom = this.top + this.height;
        // console.log(this.left + " "+ this.right);
        this.getCorner();
    }

    /* getCorner get the corner's position as a Point */
    getCorner() {
        this.topLeft = new Point(this.left, this.top);
        this.topRight = new Point(this.right, this.top);
        this.botLeft = new Point(this.left, this.bottom);
        this.botRight = new Point(this.right, this.bottom);
    }
}

class Config {
    constructor() {
        this.screenWidth = $(window).width();
        this.screenHeight = $(window).height();
        this.strokeWidth = 5;
        this.division = 9;
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


var strokeWidth = 5;

class Circuit{
    constructor(chip, config){
        this.chip = chip;
        this.config = config;
        this.setSides();
        // this.test();
    }

    setSides(){
        bottomSide.init(this.chip, this.config);
    }

    test(){
        var p1 = new Point(100, 100);
        var p2 = new Point(100, 200);
        this.leftPath = [p1, p2];
        var pathIntro = [];
        pathIntro.push(new Path(this.leftPath, 100, "bright", 0, 1, -1));
        for(let i=0; i<pathIntro.length; i++){
            let path = pathIntro[i];
            drawVertices(svg1, path.points, path.length, path.brightness, 
                path.moveCircleH, path.moveCircleV, path.slopeFix);
        }
    }
}

export { Chip, Config, Point, Path, Explosion, Particle, Cannonball, Circuit };