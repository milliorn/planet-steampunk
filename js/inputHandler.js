export default class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      //console.log(e.key);
      if (
        e.key == "ArrowUp" ||
        (e.key == "ArrowDown" && this.game.keys.indexOf(e.key) === -1)
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === " ") {
        this.game.player.shootTop();
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
      //console.log(this.game.keys);
    });

    window.addEventListener("keyup", (e) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
      //console.log(this.game.keys);
    });
  }
}
