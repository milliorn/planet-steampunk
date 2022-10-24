export default class Enemy {
  constructor(game) {
    this.frameX = 0;
    this.frameY = 0;
    this.game = game;
    this.markedForDeletion = false;
    this.maxFrame = 37;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.x = this.game.width;
  }

  update() {
    this.x += this.speedX - this.game.speed;

    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }

    /* animate sprite */
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context) {
    //context.fillStyle = "red";

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.font = "20px Helvetica";
      context.fillText(this.lives, this.x, this.y);
    }

    //context.fillStyle = "black";

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
