console.log("start");

/******************************************************
This is the hidden 'click' when you click on the text
*******************************************************/
const letter = document.querySelector("#clickable");

letter.addEventListener("click", () => {
    alert("Ive been clicked!");
});

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
}


/******************************************************
This is the clicking using only SVGs and images.
*******************************************************/


/******************************************************
KONAMI CODE.
*******************************************************/
// a key map of allowed keys
const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

// the 'official' Konami Code sequence
const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
const konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function (e) {
    // get the value of the key code from the key map
    var key = allowedKeys[e.keyCode];
    // get the value of the required key from the konami code
    var requiredKey = konamiCode[konamiCodePosition];

    // compare the key with the required key
    if (key == requiredKey) {

        // move to the next key in the konami code sequence
        konamiCodePosition++;

        // if the last key is reached, activate cheats
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    document.body.style = "url('images/cheatBackground.png')";

    var audio = new Audio('audio/pling.mp3');
    audio.play();

    alert("You discovered it!");
}
