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
export default Particle;