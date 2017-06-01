class Flock {

  constructor(main) {
    this.main = main
    this.context = this.main.context;
    this.boids = []; // Initialize the ArrayList
    this.boidsOne;     // An ArrayList for type one the boids
    this.boidsTwo;     // An ArrayList for type two the boids
    this.boidsThree; // An ArrayList for type three the boids
    this.boidsFour;   // An ArrayList for type four the boids
  }

  run() {
    for (var b in this.boids) {
      b.run(this.boids);                // Passing the entire list of boids to each boid individually
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}
