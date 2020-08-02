console.log('gameScene');

// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {
    this.stats = {
        health: 100,
        fun: 100,
    };

    // decay params
    this.decayRates = {
        health: -2,
        fun: -20,
    };
};

// executed once, after assets were loaded
gameScene.create = function () {
    // game background
    let bg = this.add.sprite(0, 0, 'backyard');
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

    // event listener for the bg
    //bg.on('pointerdown', this.placeItem, this);

    // Pet --> sprite sheet.
    // @params: Width, height, location, spriteArrayNumber
    // make interactive
    this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive();
    this.pet.depth = 1;

    // make pet draggable and what happens when dragging
    this.input.setDraggable(this.pet);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //make sprite be located at the coordinates of the dragging
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    // create the ui
    this.createUI();

    // create the hud
    this.createHUD();
    this.refreshHUD();

    // value decay of health fun stats

    this.timedEventsStats = this.time.addEvent({
        delay: 1000,
        repeat: -1, //will repeat forever
        callbackScope: this,
        callback: function () {
            console.log('decrease stats');
            this.updateStats(this.decayRates);
        },
    });
};

gameScene.createUI = function () {
    //buttons - and then chained to make them interactive
    //declare actions
    this.appleBtn = this.add.sprite(72 * 1, 570, 'apple').setInteractive();
    this.appleBtn.on('pointerdown', this.pickItem);
    this.appleBtn.customStats = { health: 20, fun: 0 };

    this.candyBtn = this.add.sprite(72 * 2, 570, 'candy').setInteractive();
    this.candyBtn.on('pointerdown', this.pickItem);
    this.candyBtn.customStats = { health: -10, fun: 10 };

    this.toyBtn = this.add.sprite(72 * 3, 570, 'toy').setInteractive();
    this.toyBtn.on('pointerdown', this.pickItem);
    this.toyBtn.customStats = { health: 0, fun: 15 };

    this.rotateBtn = this.add.sprite(72 * 4, 570, 'rotate').setInteractive();
    this.rotateBtn.on('pointerdown', this.rotatePet);
    this.rotateBtn.customStats = { health: 0, fun: 20 };

    // put them all in an array
    this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn, this.rotateBtn];

    //ui is not being blocked
    this.isTheUIBlocked = false;
    this.setUIReady();
};

gameScene.rotatePet = function () {
    // 'this' by itself is referencing the scene, not the object.
    // you need this.scene to reference the gameScene.
    if (this.scene.isTheUIBlocked) returned;

    //make sure the ui is ready
    this.scene.setUIReady();

    //block UI
    this.scene.isTheUIBlocked = true;

    this.alpha = 0.5;

    let scene = this.scene;

    // rotation tween
    let rotateTween = this.scene.tweens.add({
        targets: this.scene.pet,
        duration: 600,
        angle: 360,
        pause: false,
        callbackScope: this,
        onComplete: function (tween, sprites) {
            console.log(this);
            this.scene.updateStats(this.customStats);

            // set UI to ready
            this.scene.setUIReady();
        },
    });
};

gameScene.pickItem = function () {
    // 'this' by itself is referencing the scene, not the object.
    // you need this.scene to reference the gameScene.
    if (this.scene.isTheUIBlocked) returned;

    //make sure the ui is ready
    this.scene.setUIReady();

    // select item
    this.scene.selectedItem = this;

    // change transparency
    this.alpha = 0.5;

    // console.log(this.customStats);
    // console.log('we are picking a ' + this.texture.key)
};

gameScene.placeItem = function (pointer, localX, localY) {
    // console.log(pointer);
    // console.log(localX, localY);

    //check if item is selected
    if (!this.selectedItem) return;

    // unblock the ui
    if (this.isTheUIBlocked) returned;

    //create the new item in the position the player clicked
    let newItem = this.add.sprite(
        localX,
        localY,
        this.selectedItem.texture.key
    );

    // the pet is now 'eating'
    // 1. block the ui
    this.isTheUIBlocked = true;

    // 2. pet movement (tween)
    let petTween = this.tweens.add({
        targets: this.pet,
        duration: 500,
        x: newItem.x,
        y: newItem.y,
        paused: false,
        callbackScope: this, //without this, 'this' becomes the tween, not itself.
        onComplete: function (tween, sprites) {
            //destroy the item
            newItem.destroy();

            // event listener when animation ends
            this.pet.on(
                'animationcomplete',
                function () {
                    //set back to netural
                    this.pet.setFrame(0);

                    // return UI to ready and update score
                    this.setUIReady();
                },
                this
            );

            //use the pet animation
            this.pet.play('funnyfaces');

            this.updateStats(this.selectedItem.customStats);

            this.setUIReady();
        },
    });

    // clear the ui
    // this.setUIReady();
};

// set ui to "ready" state.
// states = ready, selectedItem, blocked
gameScene.setUIReady = function () {
    //check for nothing is selected
    this.selectedItem = null;

    for (button of this.buttons) {
        button.alpha = 1;
    }

    // scene must be unblocked
    this.isTheUIBlocked = false;
};

gameScene.createHUD = function () {
    // health stat
    this.healthText = this.add.text(20, 20, 'Health: ', {
        font: '25px Arial',
        fill: '#ffffff',
    });

    this.funText = this.add.text(170, 20, 'Fun: ', {
        font: '25px Arial',
        fill: '#ffffff',
    });
};

gameScene.refreshHUD = function () {
    this.healthText.setText('Health: ' + this.stats.health);
    this.funText.setText('Fun: ' + this.stats.fun);
};

gameScene.updateStats = function (statDiff) {
    // change pet stats
    // this.stats.health += this.selectedItem.customStats.health;
    // this.stats.fun += this.selectedItem.customStats.fun;

    // initiliaze game over
    let isGameOver = false;


    for (stat in statDiff) {
        if (statDiff.hasOwnProperty(stat)) {
            this.stats[stat] += statDiff[stat];

            if (this.stats[stat] <= 0) {
                this.stats[stat] = 0;
                isGameOver = true;
            }
        }
    }

    //refresh HUD
    this.refreshHUD();

    if (isGameOver) {
        this.gameOver();
    }
};

gameScene.gameOver = function () {
    console.log('game ova!');

    // block ui
    this.isTheUIBlocked = true;

    // change pet to dead
    this.pet.setFrame(4);

    const gameH = this.sys.game.config.height;
    const gameW = this.sys.game.config.width;

    let text = this.add.text(gameW / 2, gameH / 2, 'YOU FOUND IT', {
        font: '40px Arial',
        fill: '#ffffff',
    });

    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    // text background
    let textBg = this.add.graphics();
    // to add colors, you start with 0x, so 0xfffff
    textBg.fillStyle(0x00000, 0.7);
    textBg.fillRect(
        gameW / 2 - text.width / 2 - 10,
        gameH / 2 - text.height / 2 - 10,
        text.width + 20,
        text.height + 20
    );

    console.log("Ive been clicked at end;");

    // set event time event - pause the game
    // this.time.addEvent({
    //     delay: 2000,
    //     repeat: 0,
    //     callbackScope: this,
    //     callback: function () {
    //         console.log('decrease stats');
    //         this.scene.start('Home');
    //     },
    // });
};
