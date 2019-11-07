import {SVG_NS,PADDLE_HEIGHT,PADDLE_WIDTH,PADDLE_GAP, KEYS, BALL_RADIO, BOARD_WIDTH, BOARD_HEIGHT} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball'

export default class Game {
  constructor(element, width, height) {
          this.element = element;
          this.width = width;
          this.height = height;
          this.gameElement = document.getElementById(this.element);
          this.board = new Board(this.width, this.height);
          this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p1Up, KEYS.p1dow);
          this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, this.width - PADDLE_GAP - PADDLE_WIDTH, (this.height / 2) - (PADDLE_HEIGHT / 2), KEYS.p2Up, KEYS.p2down);
          this.ball = new Ball(BALL_RADIO, BOARD_WIDTH/2, BOARD_HEIGHT/2);
  }

  render() {
          // Reset the SVG
          this.gameElement.innerHTML = '';
          // Create the SVG
          let svg = document.createElementNS(SVG_NS, "svg");
          svg.setAttributeNS(null, "width", this.width);
          svg.setAttributeNS(null, "height", this.height);
          svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
          this.gameElement.appendChild(svg);
          // Render elements
          this.board.render(svg);
          this.paddle1.render(svg);
          this.paddle2.render(svg);
          this.ball.render(svg);
          // More code goes here....
  }
}