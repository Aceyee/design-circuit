/**
 *  Name: path.js
 *  Author: Zihan Ye
 *  Description: generate path given window width and height;
 *      path consists of numerious Point class: points (x,y)
 */
 
/*****************************************************************************/
/*              Introduction Animation Path for Blcok1                       */
/*****************************************************************************/
import {Point, Path} from './module.js';
import {copyPoints, shiftPointsH, symmetryH} from './utils.js';

//method for drawing polygons on bottom side 
var bottomSide = {
    // include three straght lines, use for loop to draw line, and shift X to draw next
    init: function (chip, config) {
        this.chip = chip;
        this.screenHeight = config.screenHeight;
        this.screenWidth = config.screenWidth;
        this.dash = this.screenHeight - chip.bottom - chip.border;
        this.deltaChipX = chip.width / config.division;
        // console.log(chip.width);
        // console.log(this.deltaChipX);
    },
    calcLeftPath: function (screenHeight = this.screenHeight, screenWidth = this.screenWidth, chip = this.chip, deltaChipX= this.deltaChipX) {
        var p1 = new Point(screenWidth / 2 - deltaChipX, screenHeight);
        var p2 = new Point(screenWidth / 2 - deltaChipX, chip.bottom + chip.border);
        this.leftPath = [p1, p2];
        var pathIntro = [];
        pathIntro.push(new Path(this.leftPath, this.dash, "bright", 0, 1, -1));
        return pathIntro;
    },
    calcMidPath: function (deltaChipX= this.deltaChipX) {
        this.midPath = copyPoints(this.leftPath);
        this.midPath = shiftPointsH(this.midPath, deltaChipX);
        var pointsArrayIntro = [];
        var dashArrayIntro = [];
        var pathIntro = [];
        pointsArrayIntro.push(this.midPath);
        dashArrayIntro.push(this.dash);
        pathIntro.push(new Path(this.midPath, this.dash, "bright", 0, 1, -1));
        return pathIntro;
    },
    calcRightPath: function (deltaChipX= this.deltaChipX) {
        this.rightPath = copyPoints(this.midPath);
        this.rightPath = shiftPointsH(this.rightPath, deltaChipX);
        var pathIntro = [];
        pathIntro.push(new Path(this.rightPath, this.dash, "bright", 0, 1, -1));
        return pathIntro;
    }
}

// method for drawing polygons on left side 
var leftSide = {
    // include three polygon lines, draw them separately in three methods
    init: function () {
        this.calcTopPath();
        this.calcMidPath();
        this.calcBotPath();
    },
    /* for each draw method, decide the way points one by one, 
        and then push these (x,y)'s to an array*/
    calcTopPath: function () {
        var p1 = new Point(chipMain.left - chipMain.border, chipMain.top);
        var p2 = new Point(p1.x - deltaChipMainX, p1.y - deltaChipMainX);
        var p3 = new Point(p2.x, 0);
        this.topPath = [p3, p2, p1];
        this.dash1 = p2.y + Math.sqrt(2) * deltaChipMainX;
        pathIntro.push(new Path(this.topPath, this.dash1, "bright", 1, 1, Math.sqrt(2) / 2));
    },

    calcMidPath: function () {
        var p1 = new Point(chipMain.left - chipMain.border, chipMain.top + deltaChipMainX);
        var p2 = new Point(p1.x - 2 * deltaChipMainX, p1.y - 2 * deltaChipMainX);
        var p3 = new Point(p2.x, 2 * deltaChipMainX);
        var p4 = new Point(p3.x - 2 * deltaChipMainX, 0);

        this.midPath = [p4, p3, p2, p1];

        this.dash2 = 2 * Math.sqrt(2) * 2 * deltaChipMainX + p2.y - p3.y;
        pointsArrayIntro.push(this.midPath);
        dashArrayIntro.push(this.dash2);
        pathIntro.push(new Path(this.midPath, this.dash2, "bright", 1, 1, Math.sqrt(2) / 2));
    },

    calcBotPath: function () {
        var p1 = new Point(chipMain.left - chipMain.border, chipMain.top + 2 * deltaChipMainX);
        var p2 = new Point(p1.x - 3 * deltaChipMainX, p1.y - 3 * deltaChipMainX);
        var p3 = new Point(p2.x, 2 * deltaChipMainX);
        var p4 = new Point(p3.x - 2 * deltaChipMainX, 0);
        this.botPath = [p4, p3, p2, p1];
        this.dash3 = (2 + 3) * Math.sqrt(2) * deltaChipMainX + p2.y - p3.y;
        pathIntro.push(new Path(this.botPath, this.dash3, "bright", 1, 1, Math.sqrt(2) / 2));
    }
}

// method for drawing polygons on right side 
var rightSide = {
    //include three polygon lines, draw them separately in three methods
    init: function () {
        this.calcTopPath();
        this.calcMidPath();
        this.calcBotPath();
    },
    // here call symmetry horzontal function to get the points in a easier way 
    calcTopPath: function () {
        this.topPath = copyPoints(leftSide.topPath);
        this.dash1 = leftSide.dash1;
        this.topPath = symmetryH(this.topPath);
        pathIntro.push(new Path(this.topPath, this.dash1, "bright", -1, 1, Math.sqrt(2) / 2));
    },
    calcMidPath: function () {
        this.midPath = copyPoints(leftSide.midPath);
        this.dash2 = leftSide.dash2;
        this.midPath = symmetryH(this.midPath);
        pointsArrayIntro.push(this.midPath);
        dashArrayIntro.push(this.dash2);
        pathIntro.push(new Path(this.midPath, this.dash2, "bright", -1, 1, Math.sqrt(2) / 2));
    },
    calcBotPath: function () {
        this.botPath = copyPoints(leftSide.botPath);
        this.dash3 = leftSide.dash3;
        this.botPath = symmetryH(this.botPath);
        pathIntro.push(new Path(this.botPath, this.dash3, "bright", -1, 1, Math.sqrt(2) / 2));
    }
};

// method for drawing polygons on top side 
var topSide = {
    // include six polygon lines, draw them separately in three methods
    init: function (chip, config) {
        this.chip = chip;
        this.screenHeight = config.screenHeight;
        this.screenWidth = config.screenWidth;
        this.deltaChipX = chip.width / config.division;
        this.dash = chip.top - chip.border + (Math.sqrt(2) - 1) * this.deltaChipX;
        this.paths = [];
        this.calcLeftLeftPath();
        this.calcLeftMidPath();
        this.calcLeftRightPath();
        this.calcRightLeftPath();
        this.calcRightMidPath();
        this.calcRightRightPath();
    },
    calcLeftLeftPath: function (chip = this.chip, deltaChipX = this.deltaChipX) {
        var p1 = new Point(chip.left, chip.top - chip.border);
        var p2 = new Point(p1.x, p1.y - deltaChipX);
        var p3 = new Point(p2.x - deltaChipX, p2.y - deltaChipX);
        var p4 = new Point(p3.x, 0);
        this.points1 = [p4, p3, p2, p1];
        this.paths.push(new Path(this.points1, this.dash, "bright", 0, 1, 1));
    },

    //Note: here the points1 already changed due to object oriented
    /* here shift the privous set of points to obtain next set of points */
    calcLeftMidPath: function (deltaChipX = this.deltaChipX) {
        this.points2 = copyPoints(this.points1);
        this.points2 = shiftPointsH(this.points2, deltaChipX);
        this.paths.push(new Path(this.points2, this.dash, "bright", 0, 1, 1));
    },
    calcLeftRightPath: function (deltaChipX = this.deltaChipX) {
        this.points3 = copyPoints(this.points2);
        this.points3 = shiftPointsH(this.points3, deltaChipX);
        this.paths.push(new Path(this.points3, this.dash, "bright", 0, 1, 1));
    },

    /* here call symmetry horzontal function to get the points in a easier way */
    calcRightLeftPath: function () {
        this.points4 = copyPoints(this.points1);
        this.points4 = symmetryH(this.points4, this.screenWidth);
        this.paths.push(new Path(this.points4, this.dash, "bright", 0, 1, 1));
    },
    calcRightMidPath: function () {
        this.points5 = copyPoints(this.points2);
        this.points5 = symmetryH(this.points5, this.screenWidth);
        this.paths.push(new Path(this.points5, this.dash, "bright", 0, 1, 1));

    },
    calcRightRightPath: function () {
        this.points5 = copyPoints(this.points3);
        this.points6 = symmetryH(this.points5, this.screenWidth);
        this.paths.push(new Path(this.points6, this.dash, "bright", 0, 1, 1));
    }
}
/*****************************************************************************/
/*              Introduction Animation Path for Blcok1 End                   */
/*****************************************************************************/




/*****************************************************************************/
/*              After-Introduction Animation Path for Blcok1                 */
/*****************************************************************************/
var leftCenterSide = {
    // include three polygon lines, draw them separately in three methods
    init: function () {
        this.triplePath = [];
        this.triplePathReverse = [];
        this.calcMidPath();
        this.calcTopPath();
        this.calcBotPath();
    },
    /* for each draw method, decide the way points one by one, 
        and then push these (x,y)'s to an array*/
    calcMidPath: function () {
        var p1 = new Point(chipMain.left - chipMain.border, screenHeight / 2);
        var p2 = new Point(p1.x - 3 * deltaChipMainX, p1.y - 3 * deltaChipMainX);
        var p3 = new Point(0, p2.y);
        this.points1 = [p3, p2, p1];
        this.dash = p2.x + Math.sqrt(2) * 3 * deltaChipMainX;
        this.triplePath.push(new Path(this.points1, this.dash, "bright", 1, 1, Math.sqrt(2) / 2));
    },

    calcTopPath: function () {
        this.points2 = copyPoints(this.points1);
        this.points2 = shiftPointsV(this.points2, -deltaChipMainX);
        this.triplePath.push(new Path(this.points2, this.dash, "bright", 1, 1, Math.sqrt(2) / 2));
    },

    calcBotPath: function () {
        this.points3 = copyPoints(this.points1);
        this.points3 = shiftPointsV(this.points3, deltaChipMainX);
        this.triplePath.push(new Path(this.points3, this.dash, "bright", 1, 1, Math.sqrt(2) / 2));
        pathRandom.push(this.triplePath);
        
        for (let i = 0; i < this.triplePath.length; i++) {
            let tempPoints = copyPoints(this.triplePath[i].points);
            tempPoints = reverse(tempPoints);
            this.triplePathReverse.push(new Path(tempPoints, this.dash, "bright", 1, 1, Math.sqrt(2) / 2));
        }
        pathRandomReverse.push(this.triplePathReverse);
    }
}

var leftBottomSide = {
    // include three polygon lines, draw them separately in three methods
    init: function () {
        this.dash = leftCenterSide.dash;
        this.triplePath = [];
        this.triplePathReverse = [];
        this.calcTopPath();
        this.calcMidPath();
        this.calcBotPath();
    },
    /* for each draw method, decide the way points one by one, 
        and then push these (x,y)'s to an array*/
    calcTopPath: function () {
        var p1 = new Point(chipMain.left - chipMain.border, screenHeight - chipMain.top);
        var p2 = new Point(p1.x - 3 * deltaChipMainX, p1.y + 3 * deltaChipMainX);
        var p3 = new Point(0, p2.y);
        this.points1 = [p3, p2, p1];
        this.triplePath.push(new Path(this.points1, this.dash, "bright", 1, -1, Math.sqrt(2) / 2));
    },

    calcMidPath: function () {
        this.points2 = copyPoints(this.points1);
        this.points2 = shiftPointsV(this.points2, -deltaChipMainX);
        this.triplePath.push(new Path(this.points2, this.dash, "bright", 1, -1, Math.sqrt(2) / 2));
    },

    calcBotPath: function () {
        this.points3 = copyPoints(this.points2);
        this.points3 = shiftPointsV(this.points3, -deltaChipMainX);
        this.triplePath.push(new Path(this.points3, this.dash, "bright", 1, -1, Math.sqrt(2) / 2));
        pathRandom.push(this.triplePath);

        for (let i = 0; i < this.triplePath.length; i++) {
            let tempPoints = copyPoints(this.triplePath[i].points);
            tempPoints = reverse(tempPoints);
            this.triplePathReverse.push(new Path(tempPoints, this.dash, "bright", 1, -1, Math.sqrt(2) / 2));
        }
        pathRandomReverse.push(this.triplePathReverse);
    }
}

var rightCenterSide = {
    // include three polygon lines, init them separately in three methods
    init: function () {
        this.dash = leftCenterSide.dash;
        this.triplePath = [];
        this.triplePathReverse = [];
        this.calcMidPath();
        this.calcTopPath();
        this.calcBotPath();
    },
    /* for each draw method, decide the way points one by one, 
        and then push these (x,y)'s to an array*/
    calcMidPath: function () {
        this.points1 = copyPoints(leftCenterSide.points1);
        this.points1 = symmetryH(this.points1);
        this.triplePath.push(new Path(this.points1, this.dash, "bright", -1, 1, Math.sqrt(2) / 2));
    },

    calcTopPath: function () {
        this.points2 = copyPoints(this.points1);
        this.points2 = shiftPointsV(this.points2, -deltaChipMainX);
        this.triplePath.push(new Path(this.points2, this.dash, "bright", -1, 1, Math.sqrt(2) / 2));
    },

    calcBotPath: function () {
        this.points3 = copyPoints(this.points1);
        this.points3 = shiftPointsV(this.points3, deltaChipMainX);
        this.triplePath.push(new Path(this.points3, this.dash, "bright", -1, 1, Math.sqrt(2) / 2));
        pathRandom.push(this.triplePath);

        for (let i = 0; i < this.triplePath.length; i++) {
            let tempPoints = copyPoints(this.triplePath[i].points);
            tempPoints = reverse(tempPoints);
            this.triplePathReverse.push(new Path(tempPoints, this.dash, "bright", -1, 1, Math.sqrt(2) / 2));
        }
        pathRandomReverse.push(this.triplePathReverse);
    }
}

var rightBottomSide = {
    // include three polygon lines, draw them separately in three methods
    init: function () {
        this.dash = leftBottomSide.dash;
        this.triplePath = [];
        this.triplePathReverse = [];
        this.calcTopPath();
        this.calcMidPath();
        this.calcBotPath();
    },
    /* for each draw method, decide the way points one by one, 
        and then push these (x,y)'s to an array*/
    calcTopPath: function () {
        this.points1 = copyPoints(leftBottomSide.points1);
        this.points1 = symmetryH(this.points1);
        this.triplePath.push(new Path(this.points1, this.dash, "bright", -1, -1, Math.sqrt(2) / 2));
    },

    calcMidPath: function () {
        this.points2 = copyPoints(this.points1);
        this.points2 = shiftPointsV(this.points2, -deltaChipMainX);
        this.triplePath.push(new Path(this.points2, this.dash, "bright", -1, -1, Math.sqrt(2) / 2));
    },

    calcBotPath: function () {
        this.points3 = copyPoints(this.points2);
        this.points3 = shiftPointsV(this.points3, -deltaChipMainX);
        this.triplePath.push(new Path(this.points3, this.dash, "bright", -1, -1, Math.sqrt(2) / 2));
        pathRandom.push(this.triplePath);

        for (let i = 0; i < this.triplePath.length; i++) {
            let tempPoints = copyPoints(this.triplePath[i].points);
            tempPoints = reverse(tempPoints);
            this.triplePathReverse.push(new Path(tempPoints, this.dash, "bright", -1, -1, Math.sqrt(2) / 2));
        }
        pathRandomReverse.push(this.triplePathReverse);
    }
}

export { bottomSide, topSide };
/*****************************************************************************/
/*            After-Introduction Animation Path for Blcok1 End               */
/*****************************************************************************/