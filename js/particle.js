export default class Particle {
  constructor(game, x, y) {
    this.angle = 0;
    this.bottomBounceBoundary = Math.random();
    this.bounced = 0;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.game = game;
    this.gravity = 0.5;
    this.image = document.getElementById("gears");
    this.markedForDeletion = false;

    this.spriteSize = 50;
    this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
    this.size = this.spriteSize * this.sizeModifier;

    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.va = Math.random() * 0.2 - 0.1;
    this.x = x;
    this.y = y;
  }

  update() {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;

    if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
      this.markedForDeletion = true;
    }

    if (
      this.y > this.game.height - this.bottomBounceBoundary &&
      !this.bounced < 5
    ) {
      this.bounced++;
      this.speedY *= -0.8;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);

    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.size * -0.5,
      this.size * -0.5,
      this.size,
      this.size
    );

    context.restore();
  }
}
