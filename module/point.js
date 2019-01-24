/* Point class contains x, y, and toString() */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return this.x + "," + this.y;
    }
}
export default Point;