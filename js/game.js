import Angler1 from "./angler1.js";
import Angler2 from "./angler2.js";
import Background from "./background.js";
import Drone from "./drone.js";
import FireExplosion from "./fireExplosion.js";
import HiveWhale from "./hiveWhale.js";
import InputHandler from "./inputHandler.js";
import LuckyFish from "./lucky.js";
import Particle from "./particle.js";
import Player from "./player.js";
import SmokeExplosion from "./smokeExplosion.js";
import UI from "./ui.js";

export default class Game {
  constructor(width, height) {
    this.ammo = 20;
    this.ammoInterval = 350;
    this.ammoTimer = 0;
    this.background = new Background(this);
    this.debug = false;
    this.enemies = [];
    this.enemyInterval = 2000;
    this.enemyTimer = 0;
    this.explosions = [];
    this.gameOver = false;
    this.gameTime = 0;
    this.height = height;
    this.input = new InputHandler(this);
    this.keys = [];
    this.maxAmmo = 50;
    this.particles = [];
    this.player = new Player(this);
    this.score = 0;
    this.speed = 1;
    this.timeLimit = 30000;
    this.ui = new UI(this);
    this.width = width;
    this.winningScore = 100;
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime;
    }

    if (this.gameTime > this.timeLimit) {
      this.gameOver = true;
    }

    this.background.update();
    this.background.layer4.update();
    this.player.update(deltaTime);

    /*if (this.gameTime > this.timeLimit) {
      this.gameOver = true;
    }*/

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );

    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    this.enemies.forEach((enemy) => {
      enemy.update();

      if (this.checkCollisions(this.player, enemy)) {
        enemy.markedForDeletion = true;

        this.addExplosion(enemy);

        for (let i = 0; i < enemy.score; i++) {
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }

        if (enemy.type === "lucky") {
          this.player.enterPowerUp();
        } else if (!this.gameOver) {
          this.score--;
        }
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollisions(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;

          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );

          if (enemy.lives <= 0) {
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }
            enemy.markedForDeletion = true;
            this.addExplosion(enemy);
            if (enemy.type === "hive") {
              const randomTemp = Math.random() * 6;

              for (let i = 0; i < randomTemp; i++) {
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
              }
            }

            if (!this.gameOver) {
              this.score += enemy.score;
            }

            /*if (this.score > this.winningScore) {
              this.gameOver = true;
            }*/
          }
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);
    this.particles.forEach((particle) => particle.draw(context));

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });

    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });

    this.background.layer4.draw(context);
  }

  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.3) {
      this.enemies.push(new Angler1(this));
    } else if (randomize < 0.6) {
      this.enemies.push(new Angler2(this));
    } else if (randomize < 0.9) {
      this.enemies.push(new HiveWhale(this));
    } else {
      this.enemies.push(new LuckyFish(this));
    }

    //console.log(this.enemies);
  }

  addExplosion(enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }

  checkCollisions(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}
