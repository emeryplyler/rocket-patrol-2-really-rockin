/*
Emery Plyler, "Wocket Patwol", April 16 2022, approx. 13-17 hrs to complete

Up to 135 points:
- animated sprite for enemies                       10
- new spaceship thats smaller, faster, more points  20
    > middle spaceship was permanently changed to
    > be small, twice as fast, and worth 100 points
- display time remaining (seconds)                  10
- move rocket while in flight                        5
- new title screen                                  10
- create new artwork, ui, and sound (non sci fi)    60 
    > 'Sky cats' theme, non-sci fi; ui has been 
    > recolored with new font and art and sound are
    > both new
- 4 new explosion sfx and randomize which one plays 10
    > the 'explosion' was changed to a meow to
    > fit the theme; 'reow.wav' up to 'reow4.wav'
- parallax scrolling background                     10

Total points:                                      135

Advice from Discord:
Sky Peterson helped with attribution and text formatting
Aidan Bacon helped with looping animation
Arrian helped with text formatting
*/

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