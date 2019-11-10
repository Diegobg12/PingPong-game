import {SVG_NS,PADDLE_HEIGHT,PADDLE_WIDTH,PADDLE_GAP, KEYS, BALL_RADIO, BOARD_WIDTH, BOARD_HEIGHT, PADDLE_SPEED, TEXT_SIZE, PADDLE_COLOR, WINNER, SECOND_BALL} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball'
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
          this.element = element;
          this.width = width;
          this.height = height;
          this.gameElement = document.getElementById(this.element);
          this.board = new Board(this.width, this.height);
          this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, (this.height / 2) - PADDLE_HEIGHT / 2, KEYS.p1Up, KEYS.p1dow);
          this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, this.width - PADDLE_GAP - PADDLE_WIDTH, (this.height / 2) - (PADDLE_HEIGHT / 2), KEYS.p2Up, KEYS.p2down);
          this.ball = new Ball(BALL_RADIO, BOARD_WIDTH, BOARD_HEIGHT);
          this.ball2 = new Ball(BALL_RADIO, BOARD_WIDTH, BOARD_HEIGHT);
          this.paused = false;
          this.score1 = new Score(10 , 30,TEXT_SIZE);
          this.score2 = new Score(this.width/2 + 25, 30,TEXT_SIZE);

          document.addEventListener("keydown", (event)=>{
                  if(event.key === KEYS.pause){
                          this.paddle1.setSpeed(PADDLE_SPEED);
                          this.paddle2.setSpeed(PADDLE_SPEED);
                          this.pause = !this.pause; 
                  }
          })
          
  }

  render() {
          if (this.pause){
                  this.paddle1.setSpeed(0);
                  this.paddle2.setSpeed(0);
                  return;
          }
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
          this.ball.render(svg, this.paddle1, this.paddle2);

        //  Render the second ball after SECOND_BALL VALUE

          const p1_ball = this.paddle1.getScore() === SECOND_BALL;
          const p2_ball = this.paddle2.getScore() === SECOND_BALL;
          if(p2_ball || p1_ball){
                this.ball2.render(svg, this.paddle1, this.paddle2);
          }

        //   this.ball2.render(svg, this.paddle1, this.paddle2);
          this.score1.render(svg, "PLAYER 1 - " + this.paddle1.getScore());
          this.score2.render(svg, this.paddle2.getScore() + " - PLAYER 2");


          
          const p1w = this.paddle1.getScore() === WINNER;
          const p2w = this.paddle2.getScore() === WINNER;
          
          if (p1w || p2w) {
                const win = document.createElementNS(SVG_NS, "text");
                win.setAttributeNS(null, "x", BOARD_WIDTH/2 -150 );
                win.setAttributeNS(null, "y", BOARD_HEIGHT/2);
                if (p1w) {
                win.textContent = "P1 WON star";  
                this.paddle1.resetScore();
                this.paddle2.resetScore();
                this.pause = !this.pause; 
                
                }else{
                win.textContent = "P2 WON";  
                this.paddle1.resetScore();
                this.paddle2.resetScore();    
                this.pause = !this.pause;  
                }
                
                win.setAttributeNS(null, "font-size", 40);
                win.setAttributeNS(null, "fill", PADDLE_COLOR);
                win.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                svg.appendChild(win);
                  
          }

          // More code goes here....

          document.addEventListener("keydown", (event)=>{
                if(event.key === KEYS.pause){
                        const pause = document.createElementNS(SVG_NS, "text");
                        pause.setAttributeNS(null, "x", BOARD_WIDTH/2 - 80 );
                        pause.setAttributeNS(null, "y", BOARD_HEIGHT/2);
                        pause.textContent = "PAUSE";
                        pause.setAttributeNS(null, "font-size", 50);
                        pause.setAttributeNS(null, "fill", PADDLE_COLOR);
                        pause.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                        svg.appendChild(pause);
                }
        })
        //   pause-----------



  }
}