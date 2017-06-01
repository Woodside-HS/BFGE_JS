'use strict'
/*
Our only global variable will be main
In main, we will initialize the game container including divs, canvas,
buttons, etc.
We will also init all images
*/
window.addEventListener('load', setup, false);

const TWO_PI = Math.PI*2;
var main;
var startTimeOffSet = Date.now();
const FRAME_RATE=30;

function setup() {
  main = new Main();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  main.run();
  window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

  class Main {
    //  Main constructor
    constructor() {
      this.game = new Game(this);
      // Grid set up
      this.blockSize = 16;
      this.numBlocks = 50;
      this.infoBarSize = 100;
      this.playAreaSize = this.blockSize*this.numBlocks;
      this.screenW = this.blockSize*this.numBlocks + this.infoBarSize;
      this.screenH = this.blockSize*this.numBlocks;
      //  ++++++  Declare images
      this.clock;
      this.seg;
      this.home;
      this.segHeadImage;
      this.flock1Images = [];
      this.flock2Images = [];
      this.flock3Images = [];
      this.flock4Images = [];

        //Start create a canvas element ++++++++++++++++++++++++++++++++
        this.canvas = document.createElement("canvas");
        this.canvas.style.backgroundColor = 'lightblue';
        //check if canvas was made
        if(!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
        //match the dimensions of the canvas div
        this.canvas.width = this.playAreaSize;
        this.canvas.height = this.playAreaSize;
        //make the canvas a child of the canvas div
        document.getElementById('canDiv').appendChild(this.canvas);
        //document.getElementById('canDiv').addEventListener('load', function(){this.appendChild(this.canvas)},false)
        //  create the context for the canvas
        this.context = this.canvas.getContext("2d");
        //check if context was made
        if(!this.context)
        throw "No valid context found!";
        //End create a canvas element ++++++++++++++++++++++++++++++++
      // declare instance variables for main
      this.menuButtons = [];
      this.boids = []
      //create all initial items
      this.init();
    }

    init(){
      // get the current time
      this.lastTime = Date.now();
      // select canvas for callbacks
      this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
      this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
      this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);
      // create menu buttons
      this.createMenuButtons();
      this.loadImages();
      this.loadFlockImages();
    }

    run() { // update canvas components --> called from draw()
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.game.run();
    }


    //  +++++++++++++++++++++++++++++++++  create buttons for menu area
    createMenuButtons(){
      var numButtons = 5;
      //create and style all button divs
      for(let i = 0; i < numButtons; i++){
        // create a button and place it on the DOM tree
        var button = document.createElement('div');
        document.getElementById("menuDiv").appendChild(button);
        // place a button image on the button
        var buttImg = new Image();
        buttImg.src = "images/buttons/mb01.png";
        buttImg.id = "bi";
        button.appendChild(buttImg);
        //  Add event listeners to images (not buttons)
        buttImg.addEventListener('mouseover',buttonMouseOverHandler,false);
        buttImg.addEventListener('mouseout',buttonMouseOutHandler,false);
        buttImg.addEventListener('click',buttonMouseClickHandler,false);
        // style buttons
        button.style.float = "left";
        button.style.marginTop = "50px";
        button.style.marginLeft = "5px";

        //push button into buttons array
        this.menuButtons.push(button);
      }

    }   // end createMenuButtons

    loadImages() {
      //+++++++  SegHead  +++++++++++++++++++++++++++++++++

      this.segHeadImage = new Image();
      this.segHeadImage.src = "images/segHead/h0.png";
      this.home = new Image();
      this.home.src = "images/other/home.png"
    }
    //  ++++++++++++++++++  Load flock Images
    //+++++++  Flock One  +++++++++++++++++++++++++++++++++
    loadFlockImages(){
      this.flock1Images = [];
      for (let i=0; i < 13; i++) {
        this.flock1Images[i] = new Image();
        this.flock1Images[i].src = "images/flock1/b"+i+".png";
      }
      //+++++++  Flock Two  +++++++++++++++++++++++++++++++++
      this.flock2Images = [];
        for (let i=0; i < 9; i++) {
        this.flock2Images[i] = new Image();
        this.flock2Images[i].src = "images/flock2/f"+i+".png";
      }
      //+++++++  Flock Three  +++++++++++++++++++++++++++++++++
      this.flock3Images = [];
      for (let i=0; i < 20; i++) {
        this.flock3Images[i] = new Image();
        this.flock3Images[i].src = "images/flock3/f"+i+".png";
      }
      //+++++++  Flock Four  +++++++++++++++++++++++++++++++++
      this.flock4Images = [1];
      for (let i=0; i < 9; i++) {
        this.flock4Images[i] = new Image();
        this.flock4Images[i].src = "images/flock4/f"+i+".png";
      }



    }  //  ++++++++++++++++++++++++ end loadFlockImages
  }//  end main class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++







  function buttonMouseOverHandler(){
    this.src = "images/buttons/mb02.png"
  }


  function buttonMouseOutHandler(){
    this.src = "images/buttons/mb01.png"
  }

  function buttonMouseClickHandler(){
    main.makeRect = !main.makeRect;
  }
/*  function mousePressed() {
    game.mousePressedHandler(new vector2d(mouseX, mouseY));
  }

  function mouseMoved() {
    game.mouseMovedHandler(new vector2d(mouseX, mouseY));
  }

  function keyPressed() {
    game.keyCodeHandler(keyCode);
  }
  */
