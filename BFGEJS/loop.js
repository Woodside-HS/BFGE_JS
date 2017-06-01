class Loop extends Peed{


  constructor(main, loc, segmentCount, name) {
    super(main, loc, segmentCount, name)
    this.main = main
    this.context = this.main.context;
    this.addBodySegments(segmentCount);
  }

  init(){

  }

  run() { // update this
      this.update();
      this.render();
  }
  update() { // render or draw this to canvas
    //remove loop after spec time
    if (Date.now() - startTimeOffSet - game.loopTimeLapsed > 2000 && this.body.length > 0 ) {
      // remove all segments from loop body
      for (let i = body.length - 1; i >= 0; i-- ) {
        body.splice(i, 1);
      }
      //remove all looped-boids from flock
      this.count = 0;
      for (let i = game.flock.boids.length - 1; i >= 0; i-- ) {
        if (game.flock.boids[i].inLoop) {
          game.flock.boids.splice(i, 1);
          this.count++;
        }
      }

      if(game.flock.boids.length < 1){
        this.level += 2;
        game.generateFlock(5*level);
      }
      // add new boids to flock

    //      switch(level) {
    //      case 1:
    //        game.addBoidsToFlock(3*count, "blueBird");
    //        break;
    //      case 3:
    //        game.addBoidsToFlock(3*count, "blackBird");
    //        break;
    //      case 5:
    //        game.addBoidsToFlock(3*count, "whiteBird");
    //        break;
    //      case 7:
    //        game.addBoidsToFlock(3*count, "batBird");
    //        break;
    //      }

      game.loopMade = false;
    }
  }
  render() { // render or draw this to canvas
    for (let i = 1; i < this.body.length; i++) {
      this.body[i].display("loop");
    }
  }

  // //  ads (numSegments) segment abject to the body arraylist
  //  void addBodySegments(int numSegments) {
  //
  //    for (int i = 0; i < numSegments; i++) {
  //      int x = (int)game.player.body.get(i).loc.x;
  //      int y = (int)game.player.body.get(i).loc.y;
  //      body.add(new Segment(x, y, i));
  //
  //    }
  //  }
}
