import 'phaser';
import {level1} from "./level1"; 


var config = {

    parent: 'NewFrogger',
    width: 480,
    height: 672,
    pixelart: true,
    zoom: 5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [level1]
};


var game = new Phaser.Game(config);
