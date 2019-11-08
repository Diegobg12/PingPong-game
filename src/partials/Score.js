import { SVG_NS, PADDLE_COLOR, PADDLE_SPEED} from '../settings';

export default class Score {
    constructor(x,y, size){
        this.x = x;
        this.y = y;
        this.size = size

    }

    render(svg, score){
        const scoreText = document.createElementNS(SVG_NS, "text");
        scoreText.setAttributeNS(null, "x", this.x);
        scoreText.setAttributeNS(null, "y", this.y);
        scoreText.textContent = score;
        scoreText.setAttributeNS(null, "font-size", this.size);
        scoreText.setAttributeNS(null, "fill", PADDLE_COLOR);
        scoreText.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
        svg.appendChild(scoreText);

    }
}