'use strict'

class Button {

constructor(main, txt, loc, w, h, c){
  this.main = main
  this.context = this.main.context;
  this.txt = txt;
  this.loc = loc;
  this.myWidth = w;
  this.myHeight = h;
  this.clr = c;
}

init(){
    this.loc;
    this.myWidth;
    this.myHeight;
    this.clr = "#0A3208"
    this.txt = "";
}

run() { // update this
    this.update();
    this.render();
}
update() { // render or draw this to canvas
}

render(){
  this.context.lineWidth = 0;
  this.context.fillStyle = "rgba(5, 25, 4, 110)";//Shadow at partial opacity
  this.context.fillRect(this.loc.x+15, this.loc.y-15, this.myWidth, this.myHeight, 20);
  this.context.fillStyle = this.clr;
  this.context.strokeStyle = "#020202"
  this.context.lineWidth = 4;
  //Button rectangle with border set at 2 pixels
  this.context.fillRect(this.loc.x, this.loc.y-30, this.myWidth, this.myHeight, 20);
  this.txt.fontsize(60)
  this.context.fillStyle = "rgba(155, 105, 30, 155)";
  this.context.fillText(this.txt, this.loc.x+44, this.loc.y+54 );
  this.context.fillStyle = "rgba(255, 255, 10)";
  this.context.fillText(this.txt, this.loc.x+40, this.loc.y+50 );
}

//  mouseLoc sent from mousePressed
//  Check to see if mouse if over bounds of
//  button when pressed
hitTest(mouseLoc) {
  if (  mouseLoc.x > this.loc.x       &&
    mouseLoc.x < this.loc.x + myWidth &&
    mouseLoc.y > this.loc.y           &&
    mouseLoc.y < this.loc.y + myHeight   )
    return true;

  return false;
}

}
