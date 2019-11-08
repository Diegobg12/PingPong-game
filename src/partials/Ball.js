import { SVG_NS, BOARD_COLOR, PADDLE_COLOR } from '../settings';
import PingSound from '../../public/sounds/pong-03.wav';

export default class Ball {
    constructor(radio, boardWidth, boardHeight) {
        this.radio = radio;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.x = this.boardWidth/2;
        this.y = this.boardHeight/2;
        this.ping = new Audio(PingSound);
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

    wallCollision(p1, p2){
        const hitTop = (this.y - this.radio <= 0);
        const hitBottom = (this.y + this.radio >= this.boardHeight);
        const hitLeft = (this.x - this.radio < 0);
        const hitRigth = (this.x + this.radio > this.boardWidth);
        if (hitTop || hitBottom) {
            this.vy = this.vy * -1;
        }
        if (hitLeft) {
            this.direction = 1;
            p2.increaseScore();
            this.reset();
        }
        if (hitRigth) {
            this.direction = -1;
            p1.increaseScore();
            this.reset();
        }

    }

    paddleCollition(p1, p2){
        let hitWall = false, checkTop = false, checkBottom = false;
        if (this.direction > 0) {
            const p2wall = p2.getCoordinates();
            hitWall = (this.x + this.radio >= p2wall.left);
            checkTop = (this.y - this.radio >= p2wall.top);
            checkBottom = (this.y + this.radio <= p2wall.bottom);
        } else{
            const p1wall = p1.getCoordinates();
            hitWall = (this.x - this.radio <= p1wall.right);
            checkTop = (this.y - this.radio >= p1wall.top);
            checkBottom = (this.y + this.radio <= p1wall.bottom);
        }
        if(hitWall && checkTop && checkBottom){
            this.ping.play();
            this.vx = this.vx * -1;
            this.direction = this.direction * -1;
        }
    }


    render(svg, p1, p2) {
      //Create Ball
    //   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
          let ball = document.createElementNS(SVG_NS, "circle");
          ball.setAttributeNS(null, "fill", PADDLE_COLOR);
          ball.setAttributeNS(null, "r", this.radio);
          ball.setAttributeNS(null, "cx", this.x);
          ball.setAttributeNS(null, "cy", this.y);
          svg.appendChild(ball);
        this.ballMove();
        this.wallCollision(p1, p2);
        this.paddleCollition(p1, p2);
    }
  }