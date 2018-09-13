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

        //Load all hazards into this array
        this.hazards=[];
        //Load all obstacles into this array
        this.obstacles=[];

        //base speed for carline
        this.baseSpeed = 4;

        this.paused;

        //Sound Configuration
        this.audioConfig= {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
    }

    preload(){
        this.frog = new Frog(this);
        
        this.endTimer = false;
        this.paused = false;
        this.loss = false;
        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
        this.load.image('Water','/assets/Environment/Water_Tile.png')
        this.load.image('Obstacle','/assets/Environment/Dirt_Tile.png');
        this.load.audio('InLevelBGM','/assets/Sounds/Level BGM2-Weapons.mp3');
        this.load.audio('PlayerKilled','/assets/Sounds/Male Death Cry.wav');

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
            [15,15,15,15,15,15,15,17,15,15,15,15,15,15,15],
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
       
        //this.obstacles = this.physics.add.staticGroup();
        this.LoadHazardsAndObstacles(level1);
        //this.Goal = this.physics.add.staticGroup();
        this.Goal= this.physics.add.sprite(32*7 +16 ,0+16,'Goal');
        //this.Goal = this.physics.add.staticGroup();
        //this.obstacles.body.setGravityY(100);
       
       
        // The player and its settings
        this.frog.create();
       
        this.carline1 = new CarLine(13,5,this.baseSpeed,2,'Car_sprite_01',this);
        this.carline1.drawCar();
        //creating Timer objects
        this.TimerText = this.add.text(0,0,'Time : 100',this);
        this.TimerValue = 100;
        //timer event set for 100 secs
        this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });
        //this.obstacles = this.physics.add.staticGroup();

         //Colliding with obstacles
         this.physics.add.overlap(this.obstacles,this.frog.sprites,this.hitObstacle,null,this);

        //Using physics overlap for dealing with overlapping sprites
        this.physics.add.overlap(this.frog.sprites, this.carline1.sprites, this.printOverlap, null, this);
        this.physics.add.overlap(this.frog.sprites, this.hazards, this.printOverlap, null, this);
        this.physics.add.overlap(this.frog.sprites,this.Goal,this.OnReachingGoal,null,this);

        //playing sound
        var music = this.sound.add('InLevelBGM');
        

        music.play(this.audioConfig);
       
    }

    update()
    {
        if(!this.endTimer)
            this.TimerText.text = "Time : " + Math.floor(100-(this.timer.getElapsed()/1000));
        
        if(!this.paused)
        {
             this.frog.update(this.input.keyboard.createCursorKeys());
             this.carline1.update();
             
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

    printOverlap(){
        
       // console.log("player entered hazard");
    }

    OnReachingGoal(){
        //this.Goal.alpha = 0;
        this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
    }

    LoadHazardsAndObstacles(level1)
    {

        for(var i= 0;i<15;i++){
            for(var j=0;j<15;j++){
                if(level1[i][j]==3){
                   this.hazards.push( this.physics.add.sprite(32*j + 16,32*i + 16,'Water'));
                }
                else if(level1[i][j]==15){
                    this.obstacles.push(this.physics.add.sprite(32*j + 16,32*i + 16,'Obstacle'));
                }


            }
        }

    }
    hitObstacle(){
        console.log("hit obstacle");
       
        this.frog.returnToPrevPosition();
    }
}