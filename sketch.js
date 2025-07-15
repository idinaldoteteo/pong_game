let height = 400;
let width = height * 2;
let ball_image;
let player1;
let computer1;
let background_image;
let soundBounce;
let soundScore;
let player1_scorer = document.getElementById("player1-score");
let player2_scorer = document.getElementById("player2-score");
let howMakeScore;

class Ball {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.diameter = 30;
        this.radius = this.diameter / 2;
        this.speedX = 3;
        this.speedY = 2;
        this.angle = 0;
    }
    
    reset() {
        this.y = height / 2;
        this.x = width / 2;
        this.speedX = Math.random() * 5;
        this.speedY = Math.random() * 5;
        this.angle = 0;
              
        this.draw();
    }
    
    draw() {
        //rotate the ball according to the angle
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        //draw the image of the ball with the size of the diameter
        image(ball_image, -this.radius, -this.radius, this.diameter, this.diameter);
        pop();
        
    }
    
    update() {
        //rotates the ball accordinly to the speed
        this.angle += 0.1;  
        //if the speed is negative, reverse the angle
        if (this.speedX < 0) {
            this.angle += Math.PI;
        }
        
        
        //if touch the edges of the canvas, reverse the speed
        if (this.x < this.diameter - this.radius || this.x > width - this.radius) {

            //if the ball is on the left side of the canvas, player 2 made a score
            console.log(width, this.x, this.radius);
            if (this.x < width / 2) {          
                //player 2 make a score
                howMakeScore = 2;                               
                player2_scorer.textContent = parseInt(player2_scorer.textContent) + 1;

            }else {
                //player 1 make a score 
                howMakeScore = 1;
                player1_scorer.textContent = parseInt(player1_scorer.textContent) + 1;
            }
            
            this.speedX *= -1;
            this.reset();
            
            //play the score sound
            soundScore.play();
            speakPontuation();

        }
        if (this.y < this.diameter - this.radius || this.y > height - this.radius) {
            this.speedY *= -1;
        }
        // update the position of the circle
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function speakPontuation() {
    //user speaker from the browser to say the score
    let message;

    if (howMakeScore == 1) {
        message = `Player 1 scored! ${player1_scorer.textContent}`;    
    }else{
        message = `Computer scored! ${player2_scorer.textContent}`;
    }

    let utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US'; // Set the language to English
    utterance.rate = 1; // Set the rate of speech
    utterance.pitch = 1; // Set the pitch of the voice
    speechSynthesis.speak(utterance);
}

class player {
    constructor(x) {
        this.weight = 10;
        this.higth = 100;
        this.x = x;
        this.y = height / 2 - this.higth / 2; // center the racket vertically
    }
    
    draw() {

        //draw the image of the racket
        if (this.x == 15) { 
            image(player1, this.x, this.y, this.weight, this.higth);
        } else {
            image(computer1, this.x, this.y, this.weight, this.higth);      
        }
        
    }

    update() {
        //if the racket is the player's, follow the mouse
        if (this.x == 15) { 
            this.y = mouseY;   

        }else{
            //if the racket is the computer's, and the ball is above the racket, move up
            if (ball.y < this.y ) {
                this.y -= 3;
            }else {
                //if the ball is below the racket, move down
                this.y += 3;
            }           
        }                

        //if colesion with the ball, reverse the speed of the ball
        if (
            this.x + this.weight >= ball.x - ball.radius &&
            this.x <= ball.x + ball.radius &&
            this.y + this.higth >= ball.y - ball.radius &&
            this.y <= ball.y + ball.radius
        ) {
            //play the bounce sound
            soundBounce.play();
            ball.speedX *= -1;
            ball.speedX *= 1.05;
            ball.speedY *= 1.05;
        }
    }
}

function preload() {

    ball_image = loadImage("../images/ball.png");
    player1 = loadImage("../images/player1.png");
    computer1 = loadImage("../images/player2.png");
    background_image = loadImage("../images/background2.png");
    soundBounce = loadSound("../sounds/hit.wav");
    soundScore = loadSound("../sounds/scorer.wav");
}

function setup() {
    createCanvas(width, height);
    background(255);
}

let ball = new Ball();
let racket = new player(15);
let computer = new player(width - 25);

function draw() {
    //draw the background image with the size of the canvas
    image(background_image, 0, 0, width, height);

    ball.draw();
    ball.update();
    racket.draw();
    racket.update();
    computer.draw();
    computer.update();
}