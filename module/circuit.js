import Point from './point.js';
import Path from './path.js';
import {drawVertices, drawVerticesAfter} from '../js/utils.js';

var strokeWidth = 5;

class Circuit{
    constructor(chip){
        this.chip = chip;
        this.test();
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
export default Circuit;