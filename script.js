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


// 