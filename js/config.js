class Config {
    constructor() {
        this.setGeneral();
        this.setCanvas();
        this.setAnimation();
        this.setExplosion();
    }

    setGeneral(){
        this.screenWidth = $('.board').width();
        this.screenHeight = $('.board').height();
        // console.log(this.screenWidth + " "+ this.screenHeight);
        this.division = 9;
    }

    setCanvas(){
        this.strokeWidth = 5;
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = this.screenWidth ;
        this.canvas.height = this.screenHeight;
        this.c = this.canvas.getContext('2d');
        this.c.fillStyle = "rgba(1, 1, 1, 0.2)";
    }

    setAnimation(){
        this.second = 2;
        this.fps = 60;
        this.lambda = this.second * this.fps;
        this.gravity = 0.6;
        this.period = 10;
    }

    setExplosion(){
        this.initialSpeedX = 8;
        this.initialSpeedY = 6;
        this.balanceSpeed = 1;
        this.resistance = 0.1;
        this.explosionParts = 5;

        /* other settings */
        this.cannonballColor = "aqua";
        this.radius = 2;
        this.particleColor = "gold";
        this.particleRadius = 1;
        this.particleBounceTimes = 1;
    }
}

export default Config;