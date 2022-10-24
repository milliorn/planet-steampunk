import Enemy from "./enemy.js";

export default class HiveWhale extends Enemy {
  constructor(game) {
    super(game);
    this.frameY = 0;
    this.height = 227;
    this.image = document.getElementById("hiveWhale");
    this.lives = 15;
    this.score = this.lives;
    this.speedX = Math.random() * -1.2 - 0.2;
    this.type = "hive";
    this.width = 400;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
}
