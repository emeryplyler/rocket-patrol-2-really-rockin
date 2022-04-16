let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credits ]
}
let game = new Phaser.Game(config);

// reserve keyboard
let keyF, keyR, keyLEFT, keyRIGHT, keyC;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;