import { SVG_NS, BOARD_COLOR, PADDLE_COLOR } from '../settings';

export default class Ball {
    constructor(radio, x, y) {

      this.radio = radio;
      this.x = x;
      this.y = y;
    }
    render(svg) {
      //Create Ball
    //   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
          let board = document.createElementNS(SVG_NS, "circle");
          board.setAttributeNS(null, "fill", PADDLE_COLOR);
          board.setAttributeNS(null, "r", this.radio);
          board.setAttributeNS(null, "cx", this.x);
          board.setAttributeNS(null, "cy", this.y);
          svg.appendChild(board);
 
    }
  }