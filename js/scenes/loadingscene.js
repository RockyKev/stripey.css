// create a new scene
console.log('loadingScene');
let loadingScene = new Phaser.Scene('Loading');

// load asset files for our game
loadingScene.preload = function () {
    const gameH = this.sys.game.config.height;
    const gameW = this.sys.game.config.width;

    //grab logo from bootScene
    let logo = this.add.sprite(gameW / 2, 200, 'logo');

    // progress bar bg
    let bgBar = this.add.graphics();
    const barW = 150;
    const barH = 30;

    bgBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);
    bgBar.fillStyle(0xf5f5f5, 1);
    bgBar.fillRect(0, 0, barW, barH);

    // progress bar
    let progressBar = this.add.graphics();
    progressBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);

    // listen to the 'progress' event - triggers whenfiles load
    this.load.on(
        'progress',
        function (value) {
            //clearing progress bar
            progressBar.clear();

            progressBar.fillStyle(0x9ad98d, 1);
            progressBar.fillRect(0, 0, value * barW, barH);
        },
        this
    );

    // load assets
    this.load.image('backyard', 'assets/images/trees-bg2.jpg');
    this.load.image('flower', 'assets/images/flower.png');

    // TESTING ONLY COMMENT OUT
    // console.log('load faker is active');
    // for (let i = 0; i < 100; i++) {
    //     this.load.image('test' + i, 'assets/images/candy.png');
    // }
};

loadingScene.create = function () {

    this.scene.start('Home');
};
