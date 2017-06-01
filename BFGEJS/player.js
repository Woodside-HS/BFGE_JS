'use strict'

class Player extends Peed{

constructor(main, headLocation, segmentCount, name){
  //add head
//  this.addthis.bodySegments(segmentCount);
  super(main, headLocation, segmentCount, name)
  this.main = main
  this.context = this.main.context;
  this.peedDelay = Date.now() - startTimeOffSet;
  this.lastSegmentAdded = Date.now() - startTimeOffSet;
}

init(){

}

run() { // update this
  //console.log("Inside boid run");
  this.update();
  this.render();
}

//Most of the game logoic for the peed takes place here
//this method is called from draw accordeing to frameRate() speed
//  default frameRate is 30fps
update() { // render or draw this to canvas
  //  If no this.this.body--go no further
  if (this.body.length < 1) return;
      // Check each boid to see if it is touching any segments in loop
  this.peedhitindexes  = [];
  for (let i = 0; i < this.body.length; i++) {
    for (let j = 0; j < game.flock.boids.length; j++)
      if (this.body[i].hitTest(game.flock.boids[j])) {
        this.peedhitindexes.push(i);
      }
  }
  //  if this.peedhitindexes > 0 then a hit has occured
  //  remove all segments after lowest index
  if (this.peedhitindexes.length > 0 ) {
    game.livesLeft --;
    if ( game.livesLeft < 1) game.gameEnded = true;
    this.min = getMinIndex();
    //Remove list elements from end to min index
    for (let i = this.body.length - 1; i >= this.min + 1; i--) {
      this.body.splice(i, 1);
    }
}

// Move head according to direction set in keyPressed()
if ( millis() - this.peedDelay > 30 && this.moved) { //millis() - peedDelay > 100 &&
  if (this.west)   this.body[0].loc.x -= blockSize/1.5;
  if (this.east)   this.body[0].loc.x += blockSize/1.5;
  if (this.north)  this.body[0].loc.y -= blockSize/1.5;
  if (this.south)  this.body[0].loc.y += blockSize/1.5;
  this.peedDelay = millis();
  // move this.body to follow head
  for (let i = this.body.length - 1; i > 0 ; i--) {
    //  let loc of segment equal loc of segment ahead
    this.body[i].loc.x = this.body[i-1].loc.x;
    this.body[i].loc.y = this.body[i-1].loc.y;
  }
}
//  Add segments to player after addSegmentInterval
if (millis() - this.lastSegmentAdded > this.addSegmentInterval) {
  this.addthis.bodySegments(1);
  this.lastSegmentAdded = millis();
}

//  If head out of bounds, then end game
if (this.body[0].loc.x < 0                       ||
  this.body[0].loc.x > playAreaSize - blockSize    ||
  this.body[0].loc.y < 0                         ||
  this.body[0].loc.y > screenH - blockSize) game.gameEnded = true;

// If head touches this.body, then loop created
if (this.moved)
  for (let i = this.body.size() - 1; i > 1 ; i--) {
    if (this.body.get(0).loc.x == this.body.get(i).loc.x && this.body.get(0).loc.y == this.body.get(i).loc.y) {
      game.makeLoop(i);
      game.loopMade = true;
    }
  }
//update highscore if game ended
if (game.gameEnded && game.score > highestScore) {
  highestScore = game.score;
}
}

render() { // render or draw this to canvas
  for (let i = 1; i < this.body.length; i++) {
    if (i === 1) {
      this.body[i].display("head", i);
      }
    else {
      this.body[i].display("player", i);
    }
  }
}

//  +++++++++++++++++++++++++++++++++  helper function for remove segments in update
getMinIndex() {
  this.min1 = MAX_INT;
  for (var x in this.peedhitindexes) {
    if (this.min1 > x) {
      this.min1 = x;
    }
  }
  return this.min1;
}

bodySegments(numSegments) {
  if (numSegments == 1) {
    this.body.push(new Segment(this.main, this.body[this.body.size() - 1].loc.x, this.body[this.body.size() - 1].loc.y, 1));
  }
  else {
    for (i = 0; i < numSegments; i++) {
      this.body.push(new Segment(this.main, this.loc.x, this.loc.y, i));
    }
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++END OF PLAYER CLASS++++++++++++++++++++++
}
