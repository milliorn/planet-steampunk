import Enemy from "./enemy.js";

export default class Angler1 extends Enemy {
  constructor(game) {
    super(game);
    this.frameY = Math.floor(Math.random() * 3);
    this.height = 169;
    this.image = document.getElementById("angler1");
    this.lives = 5;
    this.score = this.lives;
    this.width = 228;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}
