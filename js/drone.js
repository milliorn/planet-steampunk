import Enemy from "./enemy.js";

export default class Drone extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.frameY = Math.floor(Math.random() * 2);
    this.height = 95;
    this.image = document.getElementById("drone");
    this.lives = 3;
    this.score = this.lives;
    this.speedX = Math.random() * -4.2 - 0.5;
    this.type = "drone";
    this.width = 115;
    this.x = x;
    this.y = y;
  }
}
