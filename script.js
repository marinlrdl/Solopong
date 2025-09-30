const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let startTime;
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, speed: 5, dx: 0, dy: 0 };
let paddle = { x: 10, y: canvas.height - 40, width: 100, height: 10 };
let score = document.getElementById('score');
let reset = document.getElementById('reset-button');

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

draw();