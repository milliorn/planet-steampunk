
import Game from "./game.js";

window.addEventListener("load", function () {
  /* setup canvas */
  const canvas = this.document.getElementById("canvas1");
  /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas */
  const ctx = canvas.getContext("2d");
  canvas.width = 852;
  canvas.height = 480;

  const game = new Game(canvas.width, canvas.height);

  /* store value for timestamp from previous animation loop */
  let lastTime = 0;

  /* animation loop */
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    //console.log(deltaTime);
    lastTime = timeStamp;

    /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    /*
      https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      perform animation by requesting the browser to call specified function to
      update animation before next render
    */
    requestAnimationFrame(animate);
  }
  animate(0);
});
