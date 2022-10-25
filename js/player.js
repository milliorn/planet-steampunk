import Projectile from "./projectile.js";

export default class Player {
  constructor(game) {
    this.frameX = 0;
    this.frameY = 0;
    this.game = game;
    this.height = 190;
    this.image = document.getElementById("player");
    this.maxFrame = 37;
    this.maxSpeed = 5;
    this.powerUp = false;
    this.powerUpLimit = 10000;
    this.powerUpTimer = 0;
    this.projectiles = [];
    this.speedY = 0;
    this.width = 120;
    this.x = 20;
    this.y = 100;
  }

  update(deltaTime) {
    if (this.game.keys.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;

    /* handle boundaries on player */
    if (this.y > this.game.height - this.height * 0.5)
      this.y = this.game.height - this.height * 0.5;
    else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;

    //console.log(this.y);

    /* handle projectiles */
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    /* animate sprite */
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    /* power up */
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.ammo += 0.1;
      }
    }
  }

  draw(context) {
    //context.fillStyle = "black";
    /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect */
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.projectiles.forEach((projectile) => projectile.draw(context));

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

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30)
      );
      this.game.ammo--;
    }

    if (this.powerUp) {
      this.shootBottom();
    }
  }

  shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175)
      );
    }
  }

  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;

    if (this.game.ammo < this.game.maxAmmo) {
      this.game.ammo = this.game.maxAmmo;
    }
  }
}
