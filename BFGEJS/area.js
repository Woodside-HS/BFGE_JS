'use strict'

class GameArea{

constructor(main, location, w, h, c){
  this.main = main
  this.context = this.main.context;
  this.loc = location;
  this.myWidth = w;
  this.myHeight = h;
  this.clr = c;
}

init(){
}

run() { // update this
    this.update();
    this.render();
}

update() { // render or draw this to canvas

}

render() { // render or draw this to canvas
  this.context.fillStyle = this.clr;
  this.context.fillRect(this.loc.x, this.loc.y, this.myWidth, this.myHeight);
}
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class PlayArea extends GameArea{
  constructor(main, location, w, h, c){
    super(main, location, w, h, c)
  }
  init(){

  }

  run() { // update this
      this.update();
      this.render();
      game.base.run();
      game.player.run();

      if (game.loop != null) {
        game.loop.run();
      }
  }

  update() { // render or draw this to canvas

  }

  render() { // render or draw this to canvas
    this.context.fillStyle = this.clr;
    this.context.fillRect(this.loc.x, this.loc.y, this.myWidth, this.myHeight);
  }

}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class SplashArea extends GameArea {

  constructor(main, location, w, h, c, buttonsStartIndex, numberButtons) {
    super(main, location, w, h, c)
    this.bsi = buttonsStartIndex;
    this.nb = numberButtons;
  }

  run() {
    this.update();
    this.render();
  }

  render() {
    this.context.fillStyle =this.clr;
    this.context.fillRect(this.loc.x, this.loc.y, this.myWidth, this.myHeight, 20);
    for (let i = this.bsi; i < (this.bsi + this.nb); i++ ) {
      game.buttons[i].render();
    }
  }

  update() { // render or draw this to canvas

  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class InfoArea extends GameArea{


constructor(main, location, w, h, c){
  super(main, location, w, h, c)
}

run(){
  this.render();
}

render(){
  this.yOffset = 270;
  this.context.fillStyle = this.clr
  this.context.lineWidth = 2
  this.context.fillRect(this.loc.x, this.loc.y, this.myWidth, this.myHeight, 20);
  //textSize(20);
  //Score rectangle
  this.c1 = "#412E05";
  this.c2 = "#412E41";

  this.makeInfoRect(15, -120 + this.yOffset, this.c1, this.c2, "Level");
  this.context.fillStyle = "#FFFF00"
  this.context.fillText(level, this.loc.x+75, this.loc.y - 50 + this.yOffset);
  this.makeInfoRect(15, 30 + this.yOffset, this.c1, this.c2, "Score");
  this.context.fillStyle = "#FFFF00"
  this.context.fillText(game.score, this.loc.x+75, this.loc.y + 100 + this.yOffset);
  this.makeInfoRect(15, 180+ this.yOffset, this.c1, this.c2, "Lives");
  this.context.fillStyle = "#FFFF00"
  this.context.fillText(game.livesLeft, this.loc.x+75, this.loc.y + 250+ this.yOffset );
  this.makeInfoRect(15, 330+ this.yOffset, this.c1, this.c2, "Boids");
  this.context.fillStyle = "#FFFF00"
  this.context.fillText(game.flock.boids.length, this.loc.x+75, this.loc.y + 400+ this.yOffset );
  this.makeInfoRect(15, 480+ this.yOffset, this.c1, this.c2, "Highest");
  this.context.fillStyle = "#FFFF00"
  this.context.fillText(highestScore, this.loc.x+75, this.loc.y + 550 + this.yOffset);
}

makeInfoRect(ox, oy, c1, c2, txt) {
  this.context.lineWidth = 0
  this.context.fillStyle = c1//Shadow at partial opacity
  this.context.rect(this.loc.x + ox + 10, this.loc.y + oy + 10, 120, 120, 15);
  this.context.fillStyle = c2//rect color dark
  this.context.strokeStyle = "#020202"
  this.context.lineWidth = 4
  //Button rectangle with border set at 2 pixels
  this.context.fillRect(this.loc.x + ox, this.loc.y + oy, 120, 120, 15);
  this.context.font = '26px comic sans'
  this.context.fillStyle ="#DCDC1E";
  txt.fontsize(21)
  this.context.fillText(txt, this.loc.x + ox + 20, this.loc.y + oy + 30 );
}
}
