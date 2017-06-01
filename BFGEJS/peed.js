'use strict'

class Peed{


  constructor(main, headLocation, segmentCount, name) {
    this.main = main
    this.context = this.main.context;
    this.name = name;
    this.segCount = segmentCount;
    this.loc = headLocation;
    this.clr = "#C86432";
    this.body = [];
    this.north = true;
    this.moved = false;
    this.lastSegmentAdded = Date.now() - startTimeOffSet;
  }

  init(){
    //used for both player and loop
    this.body = [];
    //Gathers the indexes of each segment that hits a boid
    this.peedHitIndexes = [];
    //Gathers the indexes of each segment that hits a boid
    this.loc = new vector2d();
    this.clr;
    this.north
    this.south
    this.east
    this.west
    this.moved;
    this.name;
    this.segCount;
    this.peedDelay;
    this.addSegmentInterval = 100;
    this.lastSegmentAdded;
  }

  run() { // update this
    if(this.moved){
      this.update();
      this.render();
    }
  }
  update() { // render or draw this to canvas

  }
  render() { // render or draw this to canvas
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].display("");
    }
  }

  //  ads (numSegments) segment abject to the body arraylist
  addBodySegments(numSegments) {

    for (let i = 0; i < numSegments; i++) {
      this.x = game.player.body[i].loc.x;
      this.y = game.player.body[i].loc.y;
      this.body.push(new Segment(this.main, this.x, this.y, i));

    }
  }

  //Use key code to set direction
   setDirection(kc) {
      // set to true no matter what key is pressed
     this.north = this.south = this.east = this.west = false;
     switch(kc) {
     case 38:
       this.north = true;
       this.moved = true;
       break;
     case 39:
       this.east = true;
       this.moved = true;
       break;
     case 40:
       this.south = true;
       this.moved = true;
       break;
     case 37:
       this.west = true;
       this.moved = true;
       break;
     }
   }
}
