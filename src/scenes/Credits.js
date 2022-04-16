class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    create() {
        // copy menu config
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
        let overConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#83b5ff',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // display title screen image
        this.add.image(0, 0, 'creditscreen').setOrigin(0);

        // show text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2, ' "Cat Meow" by yfjesse ',
                    menuConfig).setOrigin(0.5).setInteractive()
            .on('pointerover', function() {
                this.setStyle(overConfig);
            })
            .on('pointerout', function() {
                this.setStyle(menuConfig);
            })
            .on('pointerup', function() {
                var url = 'https://freesound.org/people/yfjesse/sounds/131201/';
                s = window.open(url, '_blank');
                if (s && s.focus) {
                    s.focus();
                } else if (!s) {
                    window.location.href = url;
                }
            });
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding,
                    ' is licensed under CC BY-SA 3.0 ', menuConfig).setOrigin(0.5).setInteractive()
            .on('pointerover', function() {
                this.setStyle(overConfig);
            })
            .on('pointerout', function() {
                this.setStyle(menuConfig);
            })
            .on('pointerup', function() {
                var url = 'https://creativecommons.org/licenses/by/3.0/legalcode';
                s = window.open(url, '_blank');
                if (s && s.focus) {
                    s.focus();
                } else if (!s) {
                    window.location.href = url;
                }
            });
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4 + borderPadding * 2,
                    ' I made all the art :3 (Emery Plyler) ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 5 + borderPadding * 3,
                    ' Press C for Menu ', menuConfig).setOrigin(0.5);

        // define keys
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // go back to menu
            this.sound.play('sfx_meow');
            this.scene.start("menuScene");
        }
    }
}