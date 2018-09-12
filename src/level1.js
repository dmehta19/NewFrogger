import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";
import { Collision } from "./Engine/Collision";
import { LogLines } from "./GameClass/LogLines";

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
        this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

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

        


        this.carLines = [
            new CarLine(2,2,this.baseSpeed+3,2,'Car_sprite_01',this),
            new CarLine(10,5,this.baseSpeed+1,2,'Car_sprite_01',this),
            new CarLine(11,4,this.baseSpeed,2,'Car_sprite_01',this),
            new CarLine(13,2,this.baseSpeed-2,2,'Car_sprite_01',this),
            new CarLine(14,3,this.baseSpeed-1,2,'Car_sprite_01',this)
            
            
        ];

        this.logLines = [
            new LogLines(4,3,2,[2,5],['log_end','log_middle'],this),
            new LogLines(5,2,1,[2,4],['log_end','log_middle'],this),
            new LogLines(7,2,3,[3,5],['log_end','log_middle'],this),
            new LogLines(8,4,2,[2,2],['log_end','log_middle'],this)
        ];

        //creating Timer objects
        this.TimerText = this.add.text(0,0,'Time : 100',this);
        this.TimerValue = 100;
        //timer event set for 100 secs
        this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });

        this.frog.create();
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
=======
        if(!this.isGameOver){

            
            this.frog.update(this.input.keyboard.createCursorKeys());

            // drawing carlines
            this.carLines.forEach(function(element) {
                element.drawCar();
              });

            this.logLines.forEach(element => {
                element.drawLogLines();
            });

            // checke car collisison with fog
              this.carLines.forEach(function(cars) {
                cars.colliders.forEach(car => {
                    
                }); 
              });
             // console.log(this.carLines[4].colliders[0]);
              //console.log("frog" + this.frog.collider.x);

              
              
              for(var i=0;i<this.carLines.length;i++){
                
                  for(var j=0;j<this.carLines[i].amount;j++){
                    if(!this.frog.isDie && Collision.ACollideB(this.frog.collider, this.carLines[i].colliders[j])){
                        console.log("collide with: " + "line" + i.toString() + " collider: " + j.toString());
                        this.frog.die();
                    }
                  }
              }

         /*   // checke log collisison with fog
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
       
>>>>>>> LogLinesMovement
    }



}
