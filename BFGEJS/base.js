class Base {

  constructor(main, location) {
    this.main = main
    this.context = main.context;
    this.loc = location;
    this.angle = 0;
  }

  init(){
    this.loc = vector2d(110,110)
  }

  run() {
    this.display()
  }

  display() {
    //console.log(this.main.home);
    this.context.save();
    this.context.translate(this.loc.x, this.loc.x);
    this.context.scale(.45,.45);
    this.context.drawImage(this.main.home, 12,12);
    this.context.restore();
  }
} // end  class
