import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";

export class level1 extends Phaser.Scene{
    constructor (){
        super({key:"level1"});
        this.frog;
        //Timer variables
        this.TimerText ;
        this.timer;
        this.endTimer;

        this.baseSpeed = 4;
        this.paused;
    }

    preload(){
        this.frog = new Frog(this);
        
        this.endTimer = false;
        this.paused = false;
        this.loss = false;
        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
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

        this.Goal = this.add.image(32*8 - 16,16,'Goal');
        // The player and its settings

        this.frog.create();
        this.carline1 = new CarLine(14,5,this.baseSpeed,2,'Car_sprite_01',this);

        //creating Timer objects
        this.TimerText = this.add.text(0,0,'Time : 100',this);
        this.TimerValue = 100;
        //timer event set for 100 secs
        this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });

        // //  Input Events
        // this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if(!this.endTimer)
            this.TimerText.text = "Time : " + Math.floor(100-(this.timer.getElapsed()/1000));
        
        if(!this.paused)
        {
             this.frog.update(this.input.keyboard.createCursorKeys());
            this.carline1.drawCar();
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.frog.getBounds(), this.Goal.getBounds())) 
            {
                this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
            }
        }
    }
    restartGame(){
                
        this.scene.restart();
        
    }
   
    printWinScreen(){
       
        
            this.ScreenText = this.add.text(220,230,'You won',this);
            this.time.addEvent({delay : 4000 , callback: this.restartGame, callbackScope: this });
        
        
        this.paused = true;
    }
    printLoseScreen(){
       
        
        this.ScreenText = this.add.text(210,230,'You Lose',this);
        this.time.addEvent({delay : 4000 , callback: this.restartGame, callbackScope: this });
    
    
    this.paused = true;
    }
}