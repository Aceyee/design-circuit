import {Chip, Config, Circuit} from './module.js';
import {drawVertices} from './utils.js';

var config = new Config();
var chipMain = new Chip('chipMain');
var circuit = new Circuit(chipMain, config);

for(let i =0; i<circuit.paths.length; i++){
    let pathIntro = circuit.paths[i];
    for(let j=0; j<pathIntro.length; j++){
        let path = pathIntro[j];
        drawVertices(svg1, path.points, path.length, path.brightness, 
            path.moveCircleH, path.moveCircleV, path.slopeFix);
    }
}