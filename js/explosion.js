export default class Explosion {
  constructor(game, x, y) {
    this.fps = 30;
    this.frameX = 0;
    this.game = game;
    this.spriteHeight = 200;
    this.spriteWidth = 200;
    this.height = this.spriteHeight;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.maxFrame = 8;
    this.timer = 0;
    this.width = this.spriteWidth;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }

  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    this.frameX++;

    if (this.frameX > this.maxFrame) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
