import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";
import { Collision } from "./Engine/Collision";
import { LogLines } from "./GameClass/LogLines";

export class level1 extends Phaser.Scene{
    constructor (){
        super({key:"level1"});
        this.frog = new Frog(this);

        this.baseSpeed = 4;

        this.isGameOver = false;
    }

    preload(){
        try {
            // environments
            this.load.image('frogger_tiles', '/assets/Environment/Frogger_TileMap.png');
            this.load.image('log_end', '/assets/Environment/Log_End_Left.png');
            this.load.image('log_middle', '/assets/Environment/Log_Middle.png');

            // characters
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

        this.frog.create();


        this.carLines = [
            new CarLine(10,5,this.baseSpeed+1,2,'Car_sprite_01',this),
            new CarLine(11,4,this.baseSpeed,2,'Car_sprite_01',this),
            new CarLine(13,2,this.baseSpeed-2,2,'Car_sprite_01',this),
            new CarLine(14,3,this.baseSpeed-1,2,'Car_sprite_01',this)
            
        ];

        this.logLines = [
            new LogLines(4,1,2,[4,4],['log_end','log_middle'],this)
        ];

        // //  Input Events
        // this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if(!this.isGameOver){
            this.frog.update(this.input.keyboard.createCursorKeys());
            // drawing carlines
            this.carLines.forEach(function(element) {
                element.drawCar();
              });
    
    /*// Following lines are useful! please do not delete them!

            // checke car collisison with fog
              this.carLines.forEach(function(cars) {
                cars.colliders.forEach(car => {
                    if(Collision.ACollideB(frog.collider,car)){
                        frog.Die();
                        break;
                    }
                }); 
              });
            // checke log collisison with fog
            frog.isOnLog = false;
            this.logLines.forEach(function(logs) {
                logs.colliders.forEach(log => {
                    if(Collision.ACollideB(frog.collider,log)){
                        frog.isOnLog = true;
                    }
                }); 
            });
            */
        }
       
    }

}
