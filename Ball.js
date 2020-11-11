// Ball

class Ball {
  constructor(canvas, ctx, radius, x, y, vx, vy, color, g, b) {
    this.canvas = canvas; // canvas
    this.ctx = ctx; // canvas context
    this.radius = radius || 10;	// radius
    this.x = x || canvas.width / 2; // initial x position
    this.y = y || canvas.height / 4;	// initial y position
    this.vx = vx || 0; // initial x velocity
    this.vy = vy || 0; // initial y velocity
    this.f = 0.97; // friction effect
    this.c = color || '#000000'; // color
    this.g = g; // gravity
    this.b = b; // bounce
  }

  setGravity(g) {
    this.g = g;
  }

  setBounce(b) {
    this.b = b;
  }

  // physics
  update() {
    this.x += this.vx; // apply x velocity to x position
    this.vy += this.g; // apply gravity to y velocity
    this.y += this.vy; // apply y velocity to y position

    // if ball is below window, reposition to bottom, introduce bounce and apply friction
    if(this.y+this.radius > this.canvas.height) {
      this.y = this.canvas.height - this.radius;
      this.vy *= -this.b;
      if(Math.abs(this.vx)>0) {
        this.vx *= this.f;
      }
    }

    // if ball hits right of the window, bounce off and apply friction
    if(this.x + this.radius > this.canvas.width) {
      this.x = this.canvas.width - this.radius;
      this.vx = this.vx * -1;
      this.vx *= this.f;
    }

    // if ball hits left of the window, bounce off and apply friction
    if (this.x-this.radius < 0) {
      this.vx = this.vx * -1;
      this.vx *= this.f;
    }

    this.draw();
  }

  // draw the ball
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.c;
    this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

export default Ball;
