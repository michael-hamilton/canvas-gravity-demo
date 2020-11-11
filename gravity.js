// Gravity
// © 2016 - 2020 Michael Hamilton

import Ball from './Ball';

const canvas = document.getElementById('canvas'); // canvas element
const ctx = canvas.getContext('2d'); // canvas context
let lastLoopTimestamp = new Date(); // time of last loop
let currentLoopTimestamp;
let fps; // fps
let count = 100; // number of balls to initialize for use in our demo
let gravity = 0.5; // global gravity effect
let bounce = 0.7; // bounce effect
const balls = []; // here, hold these

// Calculates FPS
const calcFPS = (lastTimestamp, currentTimestamp) => {
  fps = 1000 / (currentTimestamp - lastTimestamp);
  return Math.round(fps);
}

// Draw title, fps, etc
const drawText = (ctx) => {
  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.fillText('gravity demo', 10, 20);

  ctx.font = "14px sans-serif";
  ctx.fillText('press space to reset', 10, 45);
  ctx.fillText('up/down to change gravity', 10, 65);
  ctx.fillText('left/right to change bounce', 10, 85);
  ctx.fillText('number keys to change number of balls', 10, 105);

  ctx.fillText(`fps: ${calcFPS(lastLoopTimestamp, currentLoopTimestamp)}`, canvas.width - 60, 20);
  ctx.fillText(`balls: ${count}`, canvas.width - 75, 40);
  ctx.fillText(`gravity: ${gravity.toFixed(2)}`, canvas.width - 90, 60);
  ctx.fillText(`bounce: ${bounce.toFixed(2)}`, canvas.width - 90, 80);
}

const init = (balls, count) => {
  for (let i = 0; i < count; i++) {
    const tmpVx = Math.floor(Math.random() * ([-1, 1][Math.random() * 2 | 0] * 10));
    const tmpVy = Math.floor(Math.random() * 15) + 5;
    const radius = Math.floor(Math.random() * 15) + 5;
    const tmpX = Math.floor(Math.random() * canvas.width - radius) + radius;
    const tmpY = Math.floor(Math.random() * canvas.height - radius) + radius;
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    balls[i] = new Ball(canvas, ctx, radius, tmpX, tmpY, tmpVx, tmpVy, color, gravity, bounce);
  }
};

// Main Loop
const draw = (ctx, balls) =>{
  currentLoopTimestamp = Date.now();

  ctx.clearRect(0,0,canvas.width,canvas.height);	//Clear last frame

  ctx.fillStyle = '#111';
  ctx.fillRect(0,0,canvas.width,canvas.height);	// Background

  drawText(ctx);

  balls.forEach(b => {
    b.setGravity(gravity)
    b.setBounce(bounce)
    b.update()
  });

  lastLoopTimestamp = currentLoopTimestamp;

  requestAnimationFrame(() => draw(ctx, balls));
};

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

window.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'Space':
      balls.length = 0;
      init(balls, count);
      break;

    case 'ArrowUp':
      gravity += 0.1;
      break;

    case 'ArrowDown':
      gravity -= 0.1;
      break;

    case 'ArrowRight':
      bounce += 0.1;
      break;

    case 'ArrowLeft':
      bounce -= 0.1;
      break;

    case 'Digit1':
      count = 100;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit2':
      count = 200;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit3':
      count = 300;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit4':
      count = 400;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit5':
      count = 500;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit6':
      count = 600;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit7':
      count = 700;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit8':
      count = 800;
      balls.length = 0;
      init(balls, count);
      break;

    case 'Digit9':
      count = 900;
      balls.length = 0;
      init(balls, count);
      break;
  }
});

// Set the canvas dimensions to that of the window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

init(balls, count);
draw(ctx, balls);
