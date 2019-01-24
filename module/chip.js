/* Chip class is used to calculate and store the positions and offsets
    of chips such as main chip, switch chip, and message board chip*/
import Point from './point.js';

class Chip {
    /* id is passed as parameter to determine if is is main chip, 
        switch chip, or message board chip*/
    constructor(id) {
        this.id = id;
        this.getOffset();
    }

    /* getOffset get the offset, width, and height of that chip */
    getOffset(id = this.id) {
        this.border = 25;
        this.offset = $('#' + id).offset();
        this.width = $('#' + id).width();
        this.height = $('#' + id).height();
        this.getRelativeOffset();
    }

    /* getRelativeOffset get the border position of each chip. */
    // Relative to Parent, not to screen. left, right, top, and bottom
    getRelativeOffset(offset = this.offset) {
        this.left = offset.left;
        this.right = this.left + this.width;
        this.top = offset.top;
        this.bottom = this.top +this.height;
        // console.log(this.left + " "+ this.right);
        this.getCorner();
    }

    /* getCorner get the corner's position as a Point */
    getCorner() {
        this.topLeft = new Point(this.left, this.top);
        this.topRight = new Point(this.right, this.top);
        this.botLeft = new Point(this.left, this.bottom);
        this.botRight = new Point(this.right, this.bottom);
    }
}
export default Chip;