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
export default Explosion;