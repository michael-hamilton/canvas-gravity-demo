var c = document.getElementById('canvas'),	//canvas element
  ctx = c.getContext('2d'),				//canvas context
  lastLoop = new Date(),					//time of last loop
  fps,									//initialize here to calc fps later
  count = 1000;							//number of balls to initialize for use in our demo

//create a new ball
function Ball(r,x,y,vx,vy,color) {
  this.r = r || 10;				//radius
  this.x = x || c.width/2;		//initial x position
  this.y = y || c.height/4;		//initial y position
  this.vx = vx || 0;				//initial x velocity
  this.vy = vy || 0;				//initial y velocity
  this.gs = 0;					//initial gravity speed
  this.g = 0.5;					//gravity effect
  this.b = 0.8;					//bounce effect
  this.f = 0.97;					//fiction effect
  this.c = color || '#000000';	//color

  this.update = function() {
    this.x += this.vx;		//apply x velocity to x position
    this.vy += this.g;		//apply gravity to y velocity
    this.y += this.vy;		//apply y velocity to y position

    //if ball is below canvas, reposition to bottom, introduce bounce and apply friction
    if(this.y+this.r > c.height) {
      this.y = c.height - this.r;
      this.vy *= -this.b;
      if(Math.abs(this.vx)>0) {
        this.vx *= this.f;
      }
    }
    //if ball hits right wall, bounce off and apply friction
    if(this.x+this.r > c.width) {
      this.x = c.width - this.r;
      this.vx = this.vx * -1;
      this.vx *= this.f;
    }
    //if ball hits left wall, bounce off and apply friction
    if (this.x-this.r < 0) {
      this.vx = this.vx * -1;
      this.vx *= this.f;
    }

    this.draw();
  }

  //draw the ball
  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
  }
}


//Draw the world
function drawWorld() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,c.height-1,c.width,c.height); 	//ground
  ctx.fillRect(c.width-1,0,c.width,c.height);		//right wall
}

//Calculate FPS
function calcFPS() {
  var thisLoop = new Date();				//time of current loop
  fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop;
  ctx.font = "16px sans-serif";
  ctx.fillText("fps: " + Math.round(fps), 0, 16);
}

//Main Loop
function loop(){
  ctx.clearRect(0,0,c.width,c.height);	//Clear last frame

  drawWorld();
  // ball.update();

  calcFPS();

  balls.map(function(b){
    b.update();
  });

  requestAnimationFrame(loop);
};


//Create an array of randomly generated balls to be thrown into our 'world'
var balls = [];
for(i=0; i<count; i++){
  var tmpVx = Math.floor(Math.random()*15)+5,
    tmpVy = Math.floor(Math.random()*15)+5,
    tmpR = Math.floor(Math.random()*15)+5,
    tmpX = Math.floor(Math.random()*c.width-tmpR)+tmpR,
    tmpY = Math.floor(Math.random()*c.height-tmpR)+tmpR,
    tmpColor = '#'+Math.floor(Math.random()*16777215).toString(16);

  balls[i] = new Ball(tmpR,tmpX,tmpY,tmpVx,tmpVy,tmpColor);
}

loop();
