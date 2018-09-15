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

        //Audio files loaders
        this.bgmMusic;
        this.winMusic;
        this.loseMusic;

        //boolean flags
        this.paused;
            
        this.playerKilled;
        this.reachedGoal;

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
        this.playerKilled = false;
        this.reachedGoal = false;
        //Load files
        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
        this.load.image('Water','/assets/Environment/Water_Tile.png')
        this.load.image('Obstacle','/assets/Environment/Dirt_Tile.png');
        this.load.audio('InLevelBGM','/assets/Sounds/Level BGM2-Weapons.mp3');
        this.load.audio('PlayerKilled','/assets/Sounds/Male Death Cry.wav');
        this.load.audio('ReachedGoal','/assets/Sounds/Level Complete.wav')

        try {
            this.load.image('frogger_tiles', '/assets/Environment/Frogger_TileMap.png');
            this.load.image('Car_sprite_01','/assets/Imgs/Cars/Car_sprite_01.png');
        } catch (error) {
            alert(error.message);
        }
        this.frog.preload();
    }

    create(){
       
        //Load TileMap
        this.loadTileMap();
       
       
        // The player and its settings
        this.frog.create();
        this.carline1 = new CarLine(13,5,this.baseSpeed,2,'Car_sprite_01',this);
        this.carline1.drawCar();
        
        
        //Load Timer event
        this.loadTimer();
         
        //Load collision events
        this.loadCollisionHandlers();

        //Load sound objects
        this.loadSoundHandlers();
        
    }

    loadTileMap(){

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
       
        //Loads hazards and obstacles as physics sprites
        this.LoadHazardsAndObstacles(level1);
       
        //load goal sprite
        this.Goal= this.physics.add.sprite(32*7 +16 ,0+16,'Goal');
    }

    loadTimer(){
        //creating Timer objects
        this.TimerText = this.add.text(0,0,'Time : 100',this);
        this.TimerValue = 100;

        //timer event set for 100 secs
        this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });
    }

    loadCollisionHandlers(){
        //Colliding with obstacles
        this.physics.add.overlap(this.obstacles,this.frog.sprites,this.hitObstacle,null,this);

        //Using physics overlap for dealing with overlapping sprites
        this.physics.add.overlap(this.frog.sprites, this.carline1.sprites, this.playPlayerKilledMusic, null, this);
        this.physics.add.overlap(this.frog.sprites, this.hazards, this.playPlayerKilledMusic, null, this);
        this.physics.add.overlap(this.frog.sprites,this.Goal,this.OnReachingGoal,null,this);

    }

    loadSoundHandlers(){
        //creating sound variables
        this.bgmMusic = this.sound.add('InLevelBGM');
        this.winMusic = this.sound.add('ReachedGoal');
        this.loseMusic = this.sound.add('PlayerKilled');
        
        //start playing level bgm
        this.bgmMusic.play(this.audioConfig);
    }
    

    update()
    {
        //update timer text
        if(!this.endTimer)
            this.TimerText.text = "Time : " + Math.floor(100-(this.timer.getElapsed()/1000));
        
        //Update player and car 
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
             
         
        //setting win screen text
        this.ScreenText = this.add.text(220,230,'You won',this);
        this.time.addEvent({delay : 4000 , callback: this.restartGame, callbackScope: this });
        
        //check in update function to pause other objects movement
        this.paused = true;
    }

    printLoseScreen(){
                
        //setting lose screen text
        this.ScreenText = this.add.text(210,230,'You Lose',this);
        this.time.addEvent({delay : 4000 , callback: this.restartGame, callbackScope: this });
    
        //check in update function to pause other objects movement
        this.paused = true;
    }

   

    OnReachingGoal(){
        
        //this.Goal.alpha = 0;
         //playing win music
         if(!this.reachedGoal){
         this.playPlayerKilledMusic();
        }
        
        this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
    }

    LoadHazardsAndObstacles(level1)
    {
        //Looking for hazards and obstacles and adding them to the respective array objects
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
    playPlayerWonMusic(){
        //stop bgm music
        if(this.bgmMusic.isPlaying)
        {
            this.bgmMusic.stop();
        }

        this.winMusic.play(this.audioConfig);
        this.reachedGoal = true;
      
         
        
    }
    playPlayerKilledMusic(){

        //only play for the first time this is called
        if(!this.playerKilled)
        {
            this.loseMusic.play();
            

            if(this.bgmMusic.isPlaying)
            {
                this.bgmMusic.stop();
            }
        }

        this.playerKilled = true;
       
        this.printLoseScreen();

    }
    

    hitObstacle(){

        console.log("hit obstacle");
       // returning to previous position because of collision
        this.frog.returnToPrevPosition();
    }
}