const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(canvas.width / 2 - 40, canvas.height - 20, 80, 10);

ctx.beginPath();
ctx.arc(50, 50, 15, 0, Math.PI * 2);
ctx.fillStyle = 'white';
ctx.fill();