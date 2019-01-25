import Point from './point.js';
import Path from './path.js';
import {drawVertices, drawVerticesAfter} from '../js/utils.js';
import {bottomSide} from '../js/path.js';

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
export default Circuit;