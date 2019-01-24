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
export default Cannonball;