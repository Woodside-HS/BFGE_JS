'use strict'
/*
The Game class will hold all of the logic for the game
the only parameter will be the main object
*/
class Game {
  //  Constructors  +++++++++++++++++++++++++++++++
  constructor(main) {
    // When game constructed, init the following
    this.main = main
    this.context = this.main.context;
    //++++++++++++++++++++++++++++++++++++
    this.startGameTime = 0;
    this.highestScore = 0;
    this.level;
    this.currLevel;
    //+++++++++++++++++++++++++++++++++++++++
    this.gameStarted = false;
    this.gameEnded = false;
    this.loopMade = false;
    this.level = 0;
    this.loopTimeLapsed = Date.now() - startTimeOffSet;
    this.score = 0;
    this.livesLeft = 4;

    // this.loopBounds = [new vector2d(0, 0),  new vector2d(0, 0) ];
    // this.player = new Player(this.main, new vector2d(this.blockSize*12, this.blockSize*12), 5, "player");
    // this.loop = new Loop(this.main, new vector2d(this.blockSize*10, this.blockSize*10), 0, "loop");
    // this.infoArea = new InfoArea(this.main, new vector2d(this.playAreaSize, 0), this.infoBarSize, this.screenH, "#0A3208");
    // this.playArea = new PlayArea(this.main, new vector2d(0, 0), this.playAreaSize, this.screenH, "#5A945A");
    // this.startArea = new SplashArea(this.main, new vector2d(0, 0), this.playAreaSize, this.screenH, "#5A6C94", 0, 2);
    // this.endArea = new SplashArea(this.main, new vector2d(0, 0), this.playAreaSize, this.screenH, "#5A6C94", 2, 1);
    // //this.base = new Base(this.main, new vector2d(blockSize*12-25, blockSize*12-25));
    // this.base = new Base(this, vector2d(this.blockSize*12-25, this.blockSize*12-25));
    this.flock = 0
    this.generateFlock(8);
  }  //  end Game constructor


  run() {
    //this.infoArea.run();
    if (!this.gameEnded) {
      if (this.currLevel != this.level) {
        this.currLevel = this.level;
      }
      //this.playArea.run();
      this.flock.run();
      if (this.loopMade){
        this.loop.run();
      }
    }
    else if (this.gameEnded) {
      this.endArea.run();
    }
    else {
      console.log("Outside of game")
    }
  }

  // Generate flock called from loop when loop update and game constructor
  generateFlock(numBoids) {
    this.flock = new Flock(this.main);
    // Add an initial set of boids into the system

    if (this.level === 1)
      for (let i = 0; i < numBoids; i++) {
        flock.addBoid(new BoidOne(this.main, playAreaSize/2, playAreaSize/2));
      }
    else if (this.level === 3) {
      this.livesLeft = 4;
      for (let i = 0; i < numBoids; i++) {
        flock.addBoid(new BoidOne(this.main, 300, playAreaSize/4));
        flock.addBoid(new BoidTwo(this.main, playAreaSize - 300, playAreaSize - 100));
      }
    }
    else if (this.level === 5) {
      this.livesLeft = 4;
      for (let i = 0; i < numBoids; i++) {
        flock.addBoid(new BoidOne(this.main, playAreaSize/4, playAreaSize/2));
        flock.addBoid(new BoidTwo(this.main, playAreaSize - 300, playAreaSize - 100));
        flock.addBoid(new BoidThree(this.main, playAreaSize/2, playAreaSize/4));
      }
    }
    else if (this.level === 7) {
      this.livesLeft = 4;
      for (let i = 0; i < numBoids; i++) {
        flock.addBoid(new BoidOne(this.main, playAreaSize/4, playAreaSize/2));
        flock.addBoid(new BoidTwo(this.main, playAreaSize - 300, playAreaSize - 100));
        flock.addBoid(new BoidThree(this.main, playAreaSize/2, playAreaSize/4));
        flock.addBoid(new BoidFour(this.main, 500, 700));
      }
    }
  }

  //  add to boids array  +++++++++++++++++++++++++
  addBoidsToFlock(numboids, boidType) {
    // Add an initial set of boids into the system
    for (let i = 0; i < numboids; i++) {
      if (this.level===1)
        flock.addBoid(new BoidOne(this.main, width/2, height/2));
      else if (this.level===2)
        flock.addBoid(new BoidTwo(this.main, width/2, height/2));
      else if (this.level===3)
        flock.addBoid(new BoidThree(this.main, width/2, height/2));
      else
        flock.addBoid(new BoidFour(this.main, width/2, height/2));
    }
  }


  keyCodeHandler(kc) {
    game.player.setDirection(kc);
  }

  mousePressedHandler(mouseLoc) {
    if (!this.gameStarted && (this.buttons.get(2).hitTest(mouseLoc))) {
      this.gameStarted = true;
      this.startGameTime = millis();
    }
    if (this.gameEnded && (this.buttons.get(0).hitTest(mouseLoc))) {
      this.initGame();
    }
  }

  mouseMovedHandler(mouseLoc) {
    this.clr1 = color(159, 196, 176);
    this.clr2 = color(45, 54, 74);
    if ((this.buttons.get(0).hitTest(mouseLoc)))
      this.buttons.get(0).clr = this.clr1;
    else
      this.buttons.get(0).clr = this.clr2;

    if ((this.buttons.get(1).hitTest(mouseLoc)))
      this.buttons.get(1).clr = this.clr1;
    else
      this.buttons.get(1).clr = this.clr2;

    if ((this.buttons.get(2).hitTest(mouseLoc)))
      this.buttons.get(2).clr = this.clr1;
    else
      this.buttons.get(2).clr = this.clr2;
  }

  makeButtons() {
    this.w = 400;
    this.h = 150;
    //Evntually we can place these in in an array list of Buttons
    this.buttons.push( new Button(this.main, "Play", new vector2d(this.main.blockSize*this.main.numBlocks/3.5, 200), this.w, this.h, "#2D364A"));
    this.buttons.push( new Button(this.main, "Instructions", new vector2d(this.main.blockSize*this.main.numBlocks/3.5, 400), this.w, this.h, "#2D364A"));
    this.buttons.push( new Button(this.main, "Reset?", new vector2d(this.main.blockSize*this.main.numBlocks/3.5, 200), this.w, this.h, "#2D364A"));
  }

  makeLoop(index) {
    this.x = this.player.body.get(0).loc.x;
    this.y = this.player.body.get(0).loc.y;
    if (!this.loopMade) {
      this.loop   = new Loop(this.main, new vector2d(this.x, this.y), index, "loop");
      this.loopTimeLapsed = millis();
      this.getLoopBounds(index);
      this.setBoidsInLoop();
    }
    this.player = new Player(this.main, new vector2d(blockSize*12, blockSize*12), 5, "player");
  }

  // Get top most y, left most x etc
  // return two PVectors
  //  Find the extreme x and y coordinates of a loop
  //  Save these in an array of PVectors
  getLoopBounds(index) {
    this.maxX = MIN_FLOAT;
    this.maxY = MIN_FLOAT;
    this.minX = MAX_FLOAT;
    this.minY = MAX_FLOAT;
    //get extreems and load into PVector Array
    for (let i = 0; i < this.loop.body.size(); i++) {
      if (this.maxX < this.loop.body.get(i).loc.x + 4) this.maxX = loop.body.get(i).loc.x;
      if (this.maxY < this.loop.body.get(i).loc.y) this.maxY = loop.body.get(i).loc.y;
      if (this.minX > this.loop.body.get(i).loc.x - 4) this.minX = loop.body.get(i).loc.x;
      if (this.minY > this.loop.body.get(i).loc.y) this.minY = loop.body.get(i).loc.y;
    }
    this.loopBounds[0].x = this.maxX;
    this.loopBounds[0].y = this.maxY;
    this.loopBounds[1].x = this.minX;
    this.loopBounds[1].y = this.minY;
  }

  setBoidsInLoop() {
    for (var b in this.flock.boids) {
      if (b.loc.x < this.loopBounds[0].x &&
        b.loc.y < this.loopBounds[0].y   &&
        b.loc.x > this.loopBounds[1].x   &&
        b.loc.y > this.loopBounds[1].y      ) {
        b.setInLoop(true);
        this.score++;
      }
    }
  }
} // end Game class
