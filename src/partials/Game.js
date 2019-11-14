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
          this.svg = "";
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
                          const pause = document.createElementNS(SVG_NS, "text");
                          pause.setAttributeNS(null, "x", BOARD_WIDTH/2 - 80 );
                          pause.setAttributeNS(null, "y", BOARD_HEIGHT/2);
                          pause.textContent = "PAUSE";
                          pause.setAttributeNS(null, "font-size", 50);
                          pause.setAttributeNS(null, "fill", PADDLE_COLOR);
                          pause.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                          this.svg.appendChild(pause);
                  }

                  if(event.key === KEYS.gameOver || event.key === KEYS.gameOvers){
                        const go = document.createElementNS(SVG_NS, "text");
                        go.setAttributeNS(null, "x", BOARD_WIDTH/2 - 150 );
                        go.setAttributeNS(null, "y", BOARD_HEIGHT/2);
                        go.textContent = "GAME OVER";
                        go.setAttributeNS(null, "font-size", 50);
                        go.setAttributeNS(null, "fill", PADDLE_COLOR);
                        go.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                        this.win.textContent = "";
                        this.paddle1.x = PADDLE_GAP;
                        this.paddle1.y = (this.height / 2) - PADDLE_HEIGHT / 2;
                        this.paddle2.x = this.width - PADDLE_GAP - PADDLE_WIDTH;
                        this.paddle2.y = (this.height / 2) - (PADDLE_HEIGHT / 2);
                        this.paddle1.resetScore();
                        this.paddle2.resetScore();

                        // this.svg.remove(win);
                        // ss
                        this.svg.appendChild(go);
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
          this.svg = document.createElementNS(SVG_NS, "svg");
          this.svg.setAttributeNS(null, "width", this.width);
          this.svg.setAttributeNS(null, "height", this.height);
          this.svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

          this.gameElement.appendChild(this.svg);
          // Render elements
          this.board.render(this.svg);
          this.paddle1.render(this.svg);
          this.paddle2.render(this.svg);
          this.ball.render(this.svg, this.paddle1, this.paddle2);

        //  Render the second ball after SECOND_BALL VALUE

          const p1_ball = this.paddle1.getScore() === SECOND_BALL;
          const p2_ball = this.paddle2.getScore() === SECOND_BALL;
          if(p2_ball || p1_ball){

                this.ball2.render(this.svg, this.paddle1, this.paddle2);
   
          }
          
        //   this.ball2.render(this.svg, this.paddle1, this.paddle2);
          this.score1.render(this.svg, "PLAYER 1 - " + this.paddle1.getScore());
          this.score2.render(this.svg, this.paddle2.getScore() + " - PLAYER 2");          
          const p1w = this.paddle1.getScore() === WINNER;
          const p2w = this.paddle2.getScore() === WINNER;
          
          if (p1w || p2w) {
                this.win = document.createElementNS(SVG_NS, "text");
                this.win.setAttributeNS(null, "x", BOARD_WIDTH/2-180);
                this.win.setAttributeNS(null, "y", BOARD_HEIGHT/2);
                this.win.setAttributeNS(null, "font-size", 90);
                this.win.setAttributeNS(null, "fill", PADDLE_COLOR);
                this.win.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                if (p1w) {
                this.win.textContent = "P1 WON";
                this.paddle1.resetScore();
                this.paddle2.resetScore();
                this.paddle1.x = PADDLE_GAP;
                this.paddle1.y = (this.height / 2) - PADDLE_HEIGHT / 2;
                this.paddle2.x = this.width - PADDLE_GAP - PADDLE_WIDTH;
                this.paddle2.y = (this.height / 2) - (PADDLE_HEIGHT / 2);
                
                
                }else{
                this.win.textContent = "P2 WON";  
                this.paddle1.resetScore();
                this.paddle2.resetScore();    
                
                }
                this.pause = !this.pause;  
                const ask = document.createElementNS(SVG_NS, "text");
                ask.setAttributeNS(null, "x", BOARD_WIDTH/2 -150 );
                ask.setAttributeNS(null, "y", 200);
                ask.setAttributeNS(null, "font-size", 20);
                ask.setAttributeNS(null, "fill", PADDLE_COLOR);
                ask.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
                ask.textContent = "ENTER TO STAR - N TO FINISH"; 
                this.svg.appendChild(this.win);
                this.svg.appendChild(ask);

                  
          }
                

          // More code goes here....

                
        //   pause-----------



  }
}