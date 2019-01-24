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
export default Path;