export default class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.height = 3;
    this.image = document.getElementById("projectile");
    this.markedForDeletion = false;
    this.speed = 3;
    this.width = 10;
    this.x = x;
    this.y = y;
  }
  update() {
    this.x += this.speed;

    if (this.x > this.game.width * 0.95) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    /*
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
    */
    context.drawImage(this.image, this.x, this.y);
  }
}
