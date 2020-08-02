console.log('gameScene');

// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {
    //none

};

// executed once, after assets were loaded
gameScene.create = function () {
    // game background
    let bg = this.add.sprite(0, 0, 'backyard');
    bg.setOrigin(0, 0);
    // bg.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // random dice
    const getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const flowerX = getRandomInt(1, 8);
    console.log(flowerX);

    // create the flower
    this.flowerBtn = this.add.sprite(75 * flowerX, 400, 'flower').setInteractive();
    this.flowerBtn.setScale(0.25);
    this.flowerBtn.on('pointerdown', this.setGameOver);
};

gameScene.setGameOver = function () {
    console.log("Ive been clicked!");

    // Show victory screen
    const gameH = this.scene.sys.game.config.height;
    const gameW = this.scene.sys.game.config.width;

    console.log(this);

    let text = this.scene.add.text(gameW / 2, gameH / 2, 'YOU FOUND IT', {
        font: '40px Arial',
        fill: '#ffffff',
    });

    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    // text background -- to add colors, you start with 0x, so 0xfffff
    let textBg = this.scene.add.graphics();
    textBg.fillStyle(0x00000, 0.7);
    textBg.fillRect(
        gameW / 2 - text.width / 2 - 10,
        gameH / 2 - text.height / 2 - 10,
        text.width + 20,
        text.height + 20
    );

    // Reset the game after 5 sec
    this.scene.time.addEvent({
        delay: 1000,
        repeat: 0,
        callbackScope: this,
        callback: function () {
            this.scene.scene.start('Home');
        },
    });

}

