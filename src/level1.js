import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";

export class level1 extends Phaser.Scene{
    constructor (){
        super({key:"level1"});
        this.frog = new Frog((0,0),this);
        this.baseSpeed = 4;
    }

    preload(){
        try {
            this.load.image('frogger_tiles', '/assets/Environment/Frogger_TileMap.png');
            this.load.image('Car_sprite_01','/assets/Imgs/Cars/Car_sprite_01.png');
        } catch (error) {
            alert(error.message);
        }
        this.frog.preload();
    }

    create(){
        const level1 = 
        [
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        ];
    
        const map = this.make.tilemap({
            data: level1,
            tileWidth: 32, 
            tileHeight: 32 
        });
        const tiles = map.addTilesetImage('frogger_tiles');
        const layer = map.createStaticLayer(0, tiles, 0, 0);

        // The player and its settings
        this.add.sprite(100, 450, 'frog');
        this.carline1 = new CarLine(14,5,this.baseSpeed,2,'Car_sprite_01',this);
    }

    update(){
        
        this.carline1.drawCar();
    }
}