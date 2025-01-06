const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById("currentScore");
const highScoreDisplay = document.getElementById("HighScore");

// Size of the canvas
canvas.width = 500;
canvas.height = 500;

// Game settings
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = {
    x: randomPosition(canvas.width),
    y: randomPosition(canvas.height),
}

let direction = { x: 0, y: 0 };
let score = 0;
let gameOver = false;


// Generating a random position for the food
function randomPosition(max) {
    return Math.floor(Math.random() * ( max / boxSize )) * boxSize;
}

// Snake's head
function drawHead(head){
    // head shape
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc (
        head.x + boxSize / 2,
        head.y + boxSize / 2,
        boxSize / 2,
        0,
        2 * Math.PI
    )

    ctx.fill();

    // eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc (
        head.x + boxSize / 4,
        head.y + boxSize / 4,
        boxSize / 8,
        0,
        2 * Math.PI
    );

    ctx.fill();

    ctx.beginPath();
    ctx.arc (
        head.x + (3 * boxSize) / 4,
        head.y + boxSize / 4,
        boxSize / 8,
        0,
        2 * Math.PI
    );

    ctx.fill();

    // pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc (
        head.x + boxSize / 4,
        head.y + boxSize / 4,
        boxSize / 16,
        0,
        2 * Math.PI
    );

    ctx.fill();
    ctx.beginPath();
    ctx.arc (
        head.x + (3 * boxSize) / 4,
        head.y + boxSize / 4,
        boxSize / 16,
        0,
        2 * Math.PI
    );

    ctx.fill();

    // tongue
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(head.x + boxSize / 2, head.y +  boxSize / 2);
    ctx.lineTo(head.x + boxSize / 2, head.y + boxSize);
    ctx.stroke();
    
}