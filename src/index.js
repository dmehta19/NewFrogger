import 'phaser';
import {level1} from "./level1"; 


var config = {

    parent: 'NewFrogger',
    width: 480,
    height: 480,
    pixelart: true,
    zoom: 5,
    scene: [level1]
};


var game = new Phaser.Game(config);
