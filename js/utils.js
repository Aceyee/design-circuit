/**
 *  Name: utils.js 
 *  Author: Zihan Ye
 *  Description: provided helper functions for canvas
 */

/* drawVertices() will draw a polygon that contains at least two points */
import {Point} from './module.js';

var drawVertices = function (svg, points, dash, brightness, moveCircleH, moveCircleV, slopeFix) {
    var strokeWidth = 5;
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

var drawVerticesAfter = function (svg, points, dash, brightness, moveCircleH, moveCircleV, slopeFix, reverse = false) {
    var strokeWidth = 5; 
    var circuitClass = "";
    var socketClass = "";
    var lastIndex = points.length - 1;

    if (brightness == "bright") {
        circuitClass = "circuit-fade";
        socketClass = "socket-fade";
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

    if (reverse) {
        socketClass = "socket-fade-reverse";
        newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newElement.setAttribute("class", socketClass);
        newElement.setAttribute("cx", points[0].x + moveCircleH * strokeWidth * slopeFix);
        newElement.setAttribute("cy", points[0].y + moveCircleV * strokeWidth * slopeFix);
        newElement.setAttribute("r", strokeWidth);
        newElement.setAttribute("stroke-width", strokeWidth / 2);
        svg.appendChild(newElement);
    } else {
        // draw socket/circle
        newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newElement.setAttribute("class", socketClass);
        newElement.setAttribute("cx", points[lastIndex].x + moveCircleH * strokeWidth * slopeFix);
        newElement.setAttribute("cy", points[lastIndex].y + moveCircleV * strokeWidth * slopeFix);
        newElement.setAttribute("r", strokeWidth);
        newElement.setAttribute("stroke-width", strokeWidth / 2);
        svg.appendChild(newElement);
    }

}



/* shiftPointsH() shifts points horizontally, given length */
var shiftPointsH = function (points, length) {
    for (var i = 0; i < points.length; i++) {
        points[i].x += length;
    }
    return points;
}

/* shiftPointsV() shifts points vertically, given length */
var shiftPointsV = function (points, length) {
    for (var i = 0; i < points.length; i++) {
        points[i].y += length;
    }
    return points;
}

/* symmetryH() symmetry points horizontally, by the screen width*/
var symmetryH = function (points) {
    for (var i = 0; i < points.length; i++) {
        points[i].x = screenWidth - points[i].x;
    }
    return points;
}

var reverse = function (points) {
    var reversePoints = [];
    for (var i = points.length - 1; i >= 0; i--) {
        reversePoints.push(points[i]);
    }
    return reversePoints;
}

var copyPoints = function (points) {
    var copiedPoints = [];
    for (let i = 0; i < points.length; i++) {
        var p = new Point(points[i].x, points[i].y);
        copiedPoints.push(p);
    }
    return copiedPoints;
}

var distance = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export {drawVertices, drawVerticesAfter, copyPoints, shiftPointsH};