// create a new scene
console.log('bootscene');
let bootScene = new Phaser.Scene('Boot');

// load asset files for our game
bootScene.preload = function () {
    this.load.image('logo', 'assets/images/rubber_duck.png');
};

bootScene.create = function () {
    this.scene.start('Loading');
};
