// create a new scene
console.log('homeScene');

let homeScene = new Phaser.Scene('Home');

homeScene.create = function () {
    // game background with active input

    let bg = this.add.sprite(0, 0, 'backyard').setInteractive();
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);


    // welcome text
    const gameH = this.sys.game.config.height;
    const gameW = this.sys.game.config.width;

    let text = this.add.text(gameW / 2, gameH / 2, 'CLICK TO START', {
        font: '40px Arial',
        fill: '#ffffff',
    });

    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    // text background -- to add colors, you start with 0x, so 0xfffff
    let textBg = this.add.graphics();
    textBg.fillStyle(0x00000, 0.7);
    textBg.fillRect(
        gameW / 2 - text.width / 2 - 10,
        gameH / 2 - text.height / 2 - 10,
        text.width + 20,
        text.height + 20
    );

    bg.on(
        'pointerdown',
        function () {
            this.scene.start('Game');
        },
        this
    );
};
