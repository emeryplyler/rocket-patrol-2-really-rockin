class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.image('titlescreen', './assets/titlescreen.png');
        this.load.image('creditscreen', './assets/creditbg.png');
        this.load.audio('sfx_meow', './assets/meow.wav');
        this.load.audio('sfx_reow', './assets/reow.wav');
        this.load.audio('sfx_reow2', './assets/reow2.wav');
        this.load.audio('sfx_reow3', './assets/reow3.wav');
        this.load.audio('sfx_reow4', './assets/reow4.wav');
        this.load.audio('sfx_swoosh', './assets/swoosh.wav');
    }

    create() {
        // menu config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#83b5ff',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // display title screen image
        this.add.image(0, 0, 'titlescreen').setOrigin(0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2, ' Use <- -> arrows to move and (F) to fire ',
                    menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding,
                    ' Press <- for Novice or -> for Expert ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4 + borderPadding * 2,
                    ' Press C for Credits ', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_meow');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_meow');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // credits
            this.sound.play('sfx_meow');
            this.scene.start("creditsScene");
        }
    }
}