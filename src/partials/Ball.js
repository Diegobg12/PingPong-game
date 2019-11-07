import { SVG_NS, BOARD_COLOR, PADDLE_COLOR } from '../settings';

export default class Ball {
    constructor(radio, boardWidth, boardHeight) {
        this.radio = radio;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.x = this.boardWidth/2;
        this.y = this.boardHeight/2;
        this.reset();
    }

    ballMove(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    reset(){
        this.x = this.boardWidth/2;
        this.y = this.boardHeight/2;
        this.vy = 0;
        while (this.vy === 0){
            this.vy =   Math.floor(Math.random()*10)-5;
        }
        this.vx = this.direction * (6-Math.abs(this.vy));

    }

    wallCollision(){
        const hitTop = (this.y - this.radio <=0);
        const hitBottom = (this.y + this.radio >= this.boardHeight);
        if (hitTop || hitBottom) {
            this.vy = this.vy * -1;
        }
    }

    render(svg) {
      //Create Ball
    //   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
          let ball = document.createElementNS(SVG_NS, "circle");
          ball.setAttributeNS(null, "fill", PADDLE_COLOR);
          ball.setAttributeNS(null, "r", this.radio);
          ball.setAttributeNS(null, "cx", this.x);
          ball.setAttributeNS(null, "cy", this.y);
          svg.appendChild(ball);
        this.ballMove();
        this.wallCollision();
    }
  }