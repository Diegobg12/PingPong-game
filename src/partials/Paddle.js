import { SVG_NS, PADDLE_COLOR, PADDLE_SPEED, WINNER, PADDLE_HEIGHT} from '../settings';

export default class Paddle {
    constructor(width, height, boardHeight, x, y, upKey, downKey) {
      this.width = width;
      this.height = height;
      this.boardHeight = boardHeight;
      this.x = x;
      this.y = y;
      this.score = 0;
      this.speed = PADDLE_SPEED;
      this.win = false;
      
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case upKey:
            console.log("up");
            this.moveUp();            
            break;
          case downKey:
            console.log("down");
            this.moveDown();
            break;
        }
      });

    }

    moveUp(){

        this.y = Math.max(this.y - this.speed,0);

    }
    moveDown(){
     
      this.y= Math.min(this.y + this.speed, this.boardHeight-this.height);
   
    }

// IF THE PADDLE SCORE THE HIGH REDUCE TO GIVE
    increaseScore(){
      if (this.score === WINNER) {
        this.win = true;
      }else{
        this.score += 1;
        this.height -=5;
      }

    }

    getScore(){
      return this.score;
    }
    
    setSpeed(speed){
      this.speed = speed;
    }

    getCoordinates(){
      return{
          left: this.x,
          top: this.y,
          right: this.x + this.width,
          bottom: this.y + this.height,
      }
    }

    resetScore(){
      this.score = 0;
      this.height = PADDLE_HEIGHT;
    }


    render(svg) {
      // Create the SVG
      let paddle = document.createElementNS(SVG_NS, "rect");
      paddle.setAttributeNS(null, "width", this.width);
      paddle.setAttributeNS(null, "height", this.height);
      paddle.setAttributeNS(null, "x", this.x);
      paddle.setAttributeNS(null, "y", this.y);
      paddle.setAttributeNS(null, "fill", PADDLE_COLOR);
     
      svg.appendChild(paddle);
    }

  }