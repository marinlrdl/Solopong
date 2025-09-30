const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let startTime;
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, speed: 5, dx: 5, dy: 5 };
let paddle = { x: 10, y: canvas.height - 40, width: 100, height: 10 };
let score = document.getElementById('score');
let reset = document.getElementById('reset-button');
let start = document.getElementById('start-button');

let isPlaying = false;

start.onclick = function() {
    if (!isPlaying) {
        isPlaying = true;
        startGame();
    }
};

reset.onclick = function() {
    cancelAnimationFrame(gameLoop);
    isPlaying = false;
    initialPosition();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    score.textContent = 'Score: 0';
};


function initialPosition() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5;
    ball.dy = 5;
    paddle.x = (canvas.width - paddle.width) / 2;
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function startGame() {
    const direction = Math.random() * Math.PI;
    ball.dx = direction * Math.random();
    ball.dy = - ball.speed;
    startTime = Date.now();
    gameLoop();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;


    score.textContent = 'Score: ' + Math.floor((Date.now() - startTime) / 1000);


    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > paddle.y && 
        ball.x > paddle.x && 
        ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > canvas.height ) {
        isPlaying = false;
        alert('Game Over! Your score: ' + Math.floor((Date.now() - startTime) / 1000));
    }

    
}

function movePaddle() {
    document.querySelector('.fa-arrow-left').addEventListener('click', () => {
        if(paddle.x > 0) {
            paddle.x -= 10  ;
        }
    });
    document.querySelector('.fa-arrow-right').addEventListener('click', () => {
        if(paddle.x < canvas.width - paddle.width) {
            paddle.x += 10;
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && paddle.x > 0) {
            paddle.x -= 10;
        }
        if (e.key === 'ArrowRight' && paddle.x < canvas.width - paddle.width) {
            paddle.x += 10;
        }
    });
}

function gameLoop() {
    if (!isPlaying) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

draw();
movePaddle();
