// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const boxSize = 20; // size of one snake segment and one food block
const canvasSize = 400; // width/height of the canvas
const initialSnakeLength = 3;
let snake;
let direction;
let food;
let score = 0;
let gameInterval;
let gameSpeed = 150; // Lower is faster

// Initialize the game
function init() {
    snake = [];
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    direction = 'RIGHT';
    score = 0;
    placeFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
    updateScore();
}

// Place the food at a random position on the canvas
function placeFood() {
    const maxPos = (canvasSize / boxSize) - 1;
    food = {
        x: Math.floor(Math.random() * (maxPos + 1)),
        y: Math.floor(Math.random() * (maxPos + 1))
    };
}

// Update the score display
function updateScore() {
    scoreEl.textContent = score;
}

// Draw the snake and the food
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lime' : 'green';
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

// Game loop: update snake position, check collisions, draw everything
function gameLoop() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Move head
    if (direction === 'LEFT') headX--;
    if (direction === 'UP') headY--;
    if (direction === 'RIGHT') headX++;
    if (direction === 'DOWN') headY++;

    // Check collision with walls
    if (headX < 0 || headX >= canvasSize / boxSize || headY < 0 || headY >= canvasSize / boxSize) {
        gameOver();
        return;
    }

    // Check collision with self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === headX && snake[i].y === headY) {
            gameOver();
            return;
        }
    }

    let newHead = { x: headX, y: headY };

    // Check if food is eaten
    if (headX === food.x && headY === food.y) {
        score++;
        updateScore();
        placeFood();
    } else {
        snake.pop(); // remove tail
    }

    snake.unshift(newHead); // add new head

    draw();
}

// Handle user input for direction
document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
});

// Game over function
function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score was ${score}. Press OK to restart.`);
    init();
}

// Start the game
init();
