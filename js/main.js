console.log("start");

/******************************************************
This is the hidden 'click' when you click on the text
*******************************************************/
const letter = document.querySelector("#clickable");

letter.addEventListener("click", () => {
    alert("Ive been clicked!");
});


// // No longer used?
// // https://stackoverflow.com/questions/51518818/how-to-make-canvas-responsive-using-phaser-3
// function resize() {
//     var canvas = document.querySelector("canvas");
//     var windowWidth = window.innerWidth;
//     var windowHeight = window.innerHeight;
//     var windowRatio = windowWidth / windowHeight;
//     var gameRatio = game.config.width / game.config.height;

//     if (windowRatio < gameRatio) {
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else {
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }


/******************************************************
This is the clicking using PhaserJS framework.
In the "/scenes/*.js folder": boot->loading->home->game.
*******************************************************/

// our game's configuration
let config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 450,
    scene: [bootScene, loadingScene, homeScene, gameScene],
    title: 'Virtual Pet',
    pixelArt: false,
    backgroundColor: 'ffffff',
    parent: 'game'
};

// create the game, and pass it the configuration

window.onload = function () {
    let game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}


/******************************************************
This is the clicking using only SVGs and images.
*******************************************************/


/******************************************************
KONAMI CODE.
*******************************************************/
