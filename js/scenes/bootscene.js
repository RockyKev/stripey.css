// create a new scene
console.log('bootscene');
let bootScene = new Phaser.Scene('Boot');

// load asset files for our game
bootScene.preload = function () {
    this.load.image('logo', 'assets/images/sneaky-toast-idle.gif');
};

bootScene.create = function () {
    this.scene.start('Loading');
};
