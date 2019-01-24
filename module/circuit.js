import Point from './point.js';
import Path from './path.js';
var strokeWidth = 5;
var drawVertices = function (svg, points, dash, brightness, moveCircleH, moveCircleV, slopeFix) {
    var circuitClass = "";
    var socketClass = "";
    var lastIndex = points.length - 1;

    if (brightness == "bright") {
        circuitClass = "circuit";
        socketClass = "socket";
    } else if (brightness == "dark") {
        circuitClass = "circuit-dark";
        socketClass = "socket-dark";
    }
    // draw polygon
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline'); //Create a path in SVG's namespace
    newElement.setAttribute("class", circuitClass);
    newElement.setAttribute("points", points);
    newElement.style.strokeDasharray = dash;
    newElement.style.strokeDashoffset = dash;
    svg.appendChild(newElement);

    // draw socket/circle
    newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    newElement.setAttribute("class", socketClass);
    newElement.setAttribute("cx", points[lastIndex].x + moveCircleH * strokeWidth * slopeFix);
    newElement.setAttribute("cy", points[lastIndex].y + moveCircleV * strokeWidth * slopeFix);
    newElement.setAttribute("r", strokeWidth);
    newElement.setAttribute("stroke-width", strokeWidth / 2);
    svg.appendChild(newElement);
}
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