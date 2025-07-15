let height = 400;
let weith = height * 2;
let ball_image = "../images/ball.png";
let player1 = "../images/player1.png";
let computer1 = "../images/player2.png";
let background_image = "../images/background2.png";

class Ball {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.diameter = 30;
        this.radius = this.diameter / 2;
        this.speedX = 3;
        this.speedY = 2;
    }
    reset() {
        this.y = height / 2;
        this.x = width / 2;
        this.speedX = Math.random() * 5;
        this.speedY = Math.random() * 5;
              
        this.draw();
    }
    draw() {
        //draw the image of the ball
        image(ball_image, this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
        
    }
    update() {
        //if touch the edges of the canvas, reverse the speed
        if (this.x < this.diameter - this.radius || this.x > weith - this.radius) {
            
            this.speedX *= -1;
            this.reset();
        }
        if (this.y < this.diameter - this.radius || this.y > height - this.radius) {
            this.speedY *= -1;
        }
        // update the position of the circle
        this.x += this.speedX;
        this.y += this.speedY;
    }
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
        // fill(0);
        // rect(this.x, this.y, this.weight, this.higth);
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
            ball.speedX *= -1;
            ball.speedX *= 1.05;
            ball.speedY *= 1.05;
        }
    }
}

function preload() {
    ball_image = loadImage(ball_image);
    player1 = loadImage(player1);
    computer1 = loadImage(computer1);
    background_image = loadImage(background_image);
}

function setup() {
    createCanvas(weith, height);
    background(255);
}

let ball = new Ball();
let racket = new player(15);
let computer = new player(weith - 25);

function draw() {
    //background(255);
    //draw the background image with the size of the canvas
    image(background_image, 0, 0, weith, height);

    ball.draw();
    ball.update();
    racket.draw();
    racket.update();
    computer.draw();
    computer.update();
}