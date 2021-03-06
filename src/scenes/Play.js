class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/fish.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('clouds', './assets/clouds.png');
        // load spritesheet for explosions
        this.load.spritesheet('explosion', './assets/cateat.png', 
                    {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 6});
        // load spritesheet for kitty
        this.load.spritesheet('cat', './assets/cat.png', 
                    {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 2});
    }

    create() {
        // place tile sprite for background
        // this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        // UI bar
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x795599).setOrigin(0, 0);
        
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0.5);

        // cat animation config
        this.anims.create({
            key: 'catmove',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        // three cats
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 100, game.settings.spaceshipSpeed * 2).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0);

        // special cat
        this.ship02.setScale(0.7);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, first: 0 }),
            frameRate: 4
        });

        var bgcolor = '#83b5ff';
        var txtcolor = '#68418c';

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'CustomFont',
            fontSize: '28px',
            backgroundColor: bgcolor,
            color: txtcolor,
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
                    borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60 sec timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            scoreConfig.fontSize = '20px';
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
                        scoreConfig).setOrigin(0.5);
            scoreConfig.fontSize = '28px';
            this.gameOver = true;
        }, null, this);

        this.timer = this.time.addEvent({ delay: game.settings.gameTimer });
        this.remaining = this.timer.getRemaining();

        // display timer
        scoreConfig.fixedWidth = 100;
        this.timeShow = this.add.text(game.config.width - scoreConfig.fixedWidth - borderUISize - borderPadding, 
                    borderUISize + borderPadding * 2, this.remaining, scoreConfig);
        this.seconds = 0;
        scoreConfig.fixedWidth = 0;

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    }

    update() {
        // repaint time
        this.seconds = this.timer.getRemaining() / 1000;
        this.timeShow.text = Math.ceil(this.seconds);
        
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        // starfield
        // this.starfield.tilePositionX -= 4;

        this.sky.tilePositionX -= 2;
        this.clouds.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        
        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    randomSound() {
        var key = Math.floor(Math.random() * 4 + 1);
        switch (key) {
            case 1:
                this.sound.play('sfx_reow');
                break;
            case 2:
                this.sound.play('sfx_reow2');
                break;
            case 3:
                this.sound.play('sfx_reow3');
                break;
            case 4:
                this.sound.play('sfx_reow4');
                break;
            default:
                return; // something has gone wrong, just don't do anything
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship location
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');            // explode animation
        boom.on('animationcomplete', () => {   // when animation completes, :
            ship.reset();                      // reset ship position
            ship.alpha = 1;                    // make ship visible
            boom.destroy();                    // remove explosion sprite
        });
        // add point to score+repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // sound
        // this.sound.play('sfx_reow');
        this.randomSound();
    }
}