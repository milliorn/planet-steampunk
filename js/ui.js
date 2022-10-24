export default class UI {
  constructor(game) {
    this.color = "white";
    this.fontFamily = "Bangers";
    this.fontSize = 25;
    this.game = game;
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px " + this.fontFamily;

    /* score */
    context.fillText("Score: " + this.game.score, 20, 40);

    /* draw game time on screen */
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText("Timer: " + formattedTime, 20, 100);

    /* game over */
    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1;
      let message2;

      if (this.game.score > this.game.winningScore) {
        message1 = "You win!";
        message2 = "Well done!";
      } else {
        message1 = "You lose!";
        message2 = "Try again!";
      }

      context.font = "60px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 40
      );

      context.font = "30px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 40
      );
    }

    /* ammo */
    if (this.game.player.powerUp) {
      context.fillStyle = "red";
    }
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

    context.restore();
  }
}
