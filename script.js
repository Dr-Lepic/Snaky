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
let HighScore = 0;
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

// drawing the game
function draw(){
    ctx.xlearRect(0, 0, canvas.width, canvas.height);

    // drawing the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw Snake
    snake.forEach((segment, index) => {
        if(index === 0){
            drawHead(segment);
        } else {
            ctx.fillStyle = "lime";
            ctx.fillReact(segment.x, segment.y, boxSize, boxSize);
            ctx.strokeStyle = "black";
            ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
        }
    })

    // ""Game Over"" message
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over :(", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 30);
    }

} 

// update snake's position
function update(){
    if(gameOver) return;

    const head = { 
        x: snake[0].x + direction.x * boxSize, 
        y: snake[0].y + direction.y * boxSize, 
    };

    // check if snake eats the food
    if(head.x === food.x && head.y === food.y){
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        food = {
            x: randomPosition(canvas.width),
            y: randomPosition(canvas.height),
        }
    } else {
        snake.pop();
    }

    // check for collision
    if(
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ){
        gameOver = true;
        draw();
        if(score > HighScore){
            HighScore = score;
            highScoreDisplay.textContent = `High Score: ${HighScore}`;
        }
        return;
    }
    snake.unshift(head);
}

// reset game
function resetGame(){
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    gameOver = false;
    food = {
        x: randomPosition(canvas.width),
        y: randomPosition(canvas.height),
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// handle key press
window.addEventListener("keydown", (event) => {

    if (gameOver && event.key === " ") {
        resetGame();
        return;
    }

    switch(event.key){
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});
