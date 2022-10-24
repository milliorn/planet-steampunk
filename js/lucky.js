import Enemy from "./enemy.js";

export default class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.frameY = Math.floor(Math.random() * 2);
    this.height = 95;
    this.image = document.getElementById("lucky");
    this.lives = 5;
    this.score = 15;
    this.type = "lucky";
    this.width = 99;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}
