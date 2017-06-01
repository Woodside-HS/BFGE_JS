


// Start Boid class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Boid {
  //  Boid constructor
  constructor(main, x, y) {
    this.main = main
    this.context = this.main.context;
    this.acc = vector2d(0,0)
    this.loc = vector2d(x,y);
    this.angle = Math.random()*Math.PI
    this.vel = vector2d(Math.cos(this.angle), Math.sin(this.angel));
    this.context = this.main.context;
    //create all initial items
    this.init();
  }

  init(){
    this.r = 4
    this.maxForce = 0.05
    this.maxSpeed = 0.8
  }

  run(boids) { // update this
    //console.log("Inside boid run");
    this.flock(boids)
    this.update()
    this.checkEdges()
    this.render()
  }

  applyForce(force){
    this.acc.add(force)
  }

  flock(boids){
    this.sep = this.separate(boids)
    this.ali = this.align(boids)
    this.coh = this.cohesion(boids)
    this.sep.scale(1.5)
    this.ali.scale(1)
    this.coh.scale(1)
    this.applyForce(this.sep)
    this.applyForce(this.ali)
    this.applyForce(this.coh)
  }

  update() { // render or draw this to canvas
    if(this.loc.dist(this.main.base.loc) < 400){
      this.dir = this.loc.copy().sub(this.main.base.loc);
      this.dir.normalize();
      this.dir.scale(.005);
      this.acc.add(this.dir);
      this.acc.scale(0);
    }

    if(this.loc.dist(this.main.base.loc) < 200){
      this.dir = this.loc.copy().sub(this.main.base.loc);
      this.dir.normalize();
      this.dir.scale(.08);
      this.acc.add(this.dir);
    }

    if(this.loc.dist(this.main.base.loc) < 50){
      this.dir = this.loc.copy().sub(this.main.base.loc);
      this.dir.normalize();
      this.dir.scale(.5);
      this.acc.add(this.dir);
    }
    // Update vel
    this.vel.add(this.acc);
    // Limit speed
    if(this.vel.length > this.maxspeed){
      this.vel.normalize().scale(this.maxspeed);
    }
    this.loc.add(this.vel);
    // Reset accelertion to 0 each cycle
    this.acc.scale(0);
    if(this.getInLoop()){
      this.vel.scale(0);
    }
  }

  seek(target){
    this.desired = target.copy().sub(this.loc)
    this.desired.normalize();
    this.desired.scale(this.maxspeed);
    this.steer = this.desired.copy().sub(this.vel);
    this.steer.limit(this.maxforce);  // Limit to maximum steering force
    return this.steer;
  }

  render() { // render or draw this to canvas
    //console.log("loc.x = " + this.loc.x);
    this.theta = this.vel.angle + 1.5707963268;
    this.context.lineWidth = 2
    this.context.stroke()
    this.context.save()
    this.context.translate(this.loc.x, this.loc.y)
    this.context.rotate(this.theta)
    this.context.beginPath()
    this.context.moveTo(0,-(this.r*2))
    this.context.lineTo(-this.r,this.r*2)
    this.context.lineTo(this.r,this.r*2)
    this.context.fillStyle = 'blue'
    this.context.fill()
    this.context.restore()
  }

  checkEdges(){
    if (this.loc.x < this.r) this.loc.x = this.main.canvas.width-this.r;
    if (this.loc.y < this.r) this.loc.y = this.main.canvas.height-this.r;
    if (this.loc.x > this.main.canvas.width-this.r) this.loc.x = this.r;
    if (this.loc.y > this.main.canvas.height-this.r) this.loc.y = this.r;
  }

  separate(boids) {
    this.desiredseparation = 25;
    this.steer = vector2d(0, 0, 0);
    this.count = 0;
    // For every boid in the system, check if it's too close
    for (var i in boids) {
      this.d = vector2d(this.loc.x, this.loc.y).dist(boids[i].loc);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((this.d > 0) && (this.d < this.desiredseparation)) {
        // Calculate vector pointing away from neighbor
        this.diff = vector2d(this.loc.x,this.loc.y).sub(boids[i].loc);
        this.diff.normalize();
        this.diff.div(this.d);        // Weight by distance
        this.steer.add(this.diff);
        this.count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (this.count > 0) {
      this.steer.div(this.count);
    }

    // As long as the vector is greater than 0
    if (this.steer.length() > 0) {
      // First two lines of code below could be condensed with new PVector setMag() method
      // Not using this method until Processing.js catches up
      // steer.setMag(maxspeed);

      // Implement Reynolds: Steering = Desired - vel
      this.steer.normalize();
      this.steer.scale(this.maxspeed);
      this.steer.sub(this.vel);
      if(this.steer.length > this.maxspeed){
        this.steer.normalize().scale(this.maxspeed);
      }
    }
    return this.steer;
  }

  align(boids) {
    this.neighbordist = 50;
    this.sum = vector2d(0, 0);
    this.count = 0;
    for (var i in boids) {
      this.d = vector2d(this.loc.x,this.loc.y).dist(boids[i].loc);
      if ((this.d > 0) && (this.d < this.neighbordist)) {
        this.sum.add(boids[i].vel);
        this.count++;
      }
    }
    if (this.count > 0) {
      this.sum.div(this.count);
      // First two lines of code below could be condensed with new PVector setMag() method
      // Not using this method until Processing.js catches up
      // sum.setMag(maxspeed);

      // Implement Reynolds: Steering = Desired - vel
      this.sum.normalize();
      this.sum.scale(this.maxspeed);
      this.steer = vector2d.sub(this.sum, this.vel);
      if(this.steer.length > this.maxspeed){
        this.steer.normalize().scale(this.maxspeed);
      }
      return this.steer;
    }
    else {
      return vector2d(0, 0);
    }
  }

  // Cohesion
  // For the average loc (i.e. center) of all nearby boids, calculate steering vector towards that loc
  cohesion(boids) {
    this.neighbordist = 50;
    this.sum = vector2d(0, 0);   // Start with empty vector to accumulate all locs
    this.count = 0;
    for (var i in boids) {
      this.d = vector2d(this.loc.x,this.loc.y).dist(boids[i].loc);
      if ((this.d > 0) && (this.d < this.neighbordist)) {
        this.sum.add(boids[i].loc); // Add loc
        this.count++;
      }
    }
    if (this.count > 0) {
      this.sum.div(this.count);
      return this.seek(this.sum);  // Steer towards the loc
    }
    else {
      return vector2d(0, 0);
    }
  }

  setInLoop(inLoop) {
    this.inLoop = inLoop;
  }

  getInLoop() {
    return this.inLoop;
  }
}

class BoidOne extends Boid{
  constructor(main, x, y) {
    super(main, x, y);
    this.maxspeed = 33;
    this.hitPlayer = false;
    this.count = Math.random()*birdOneImages.length-1;
  }

  display() {
    this.angle = this.vel.angle + 1.5707963268;
    this.context.stroke(50, 50, 250);
    this.context.fill(255, 20, 2);
    this.context.save();
    this.context.translate(loc.x, loc.y);
      //scale(2);
    this.context.rotate(angle);
    this.context.drawImage(birdOneImages[count++], 0, 0 );
    this.context.restore();
    if(this.count >= birdOneImages.length - 1){
      this.count = 0;
    }
  }
}

class BoidTwo extends Boid{
  constructor(main, x, y) {
    super(main, x, y);
    this.maxspeed = 12;
    this.hitPlayer = false;
    this.count = Math.random()*birdOneImages.length-1;
  }

  display() {
    this.angle = this.vel.angle + 1.5707963268;
    this.context.stroke(50, 50, 250);
    this.context.fill(255, 20, 2);
    this.context.save();
    this.context.translate(loc.x, loc.y);
      //scale(2);
    this.context.rotate(angle);
    this.context.drawImage(birdTwoImages[count++], 0, 0 );
    this.context.restore();
    if(this.count >= birdTwoImages.length - 1){
      this.count = 0;
    }
  }
}

class BoidThree extends Boid{
  constructor(main, x, y) {
    super(main, x, y);
    this.maxspeed = 1.8;
    this.hitPlayer = false;
    this.count = Math.random()*birdOneImages.length-1;
  }

  display() {
    this.angle = this.vel.angle + 1.5707963268;
    this.context.stroke(50, 50, 250);
    this.context.fill(255, 20, 2);
    this.context.save();
    this.context.translate(loc.x, loc.y);
      //scale(2);
    this.context.rotate(angle);
    this.context.drawImage(birdThreeImages[count++], 0, 0 );
    this.context.restore();
    if(this.count >= birdThreeImages.length - 1){
      this.count = 0;
    }
  }
}

class BoidFour extends Boid{
  constructor(main, x, y) {
    super(main, x, y);
    this.maxspeed = 2;
    this.hitPlayer = false;
    this.count = Math.random()*birdOneImages.length-1;
  }

  display() {
    this.angle = this.vel.angle + 1.5707963268;
    this.context.stroke(50, 50, 250);
    this.context.fill(255, 20, 2);
    this.context.save();
    this.context.translate(loc.x, loc.y);
      //scale(2);
    this.context.rotate(angle);
    this.context.drawImage(birdFourImages[count++], 0, 0 );
    this.context.restore();
    if(this.count >= birdFourImages.length - 1){
      this.count = 0;
    }
  }
}
