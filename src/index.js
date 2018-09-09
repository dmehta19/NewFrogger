import 'phaser';
import {level1} from "./level1"; 
import {CarLine} from "./CarLine"; 

var config = {

    parent: 'NewFrogger',
    width: 480,
    height: 480,
    scene: [level1]
};


var game = new Phaser.Game(config);
