import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";
import { Collision } from "./Engine/Collision";
import { LogLines } from "./GameClass/LogLines";
import { BulletPool } from "./GameClass/BulletPool";

export class level1 extends Phaser.Scene{
    
    constructor (){
        super({key:"level1"});
        this.frog;
        //Timer variables
        this.TimerText ;
        this.timer;
        this.endTimer;

        this.bullets = [];

        this.baseSpeed = 2;
        this.paused = false;

        //sound variables
        this.bgmMusic;
        this.winMusic;
        this.loseMusic;
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


        this.playerKilled;
        this.reachedGoal;
        this.isGameOver = false;
    }
    preload(){
        this.frog = new Frog(this);
        
        this.endTimer = false;
        this.paused = false;
        this.loss = false;

        //set to false at the start of the level
        this.playerKilled = false;
        this.reachedGoal = false;

        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
        try {
            // environments
            this.load.image('frogger_tiles', '/assets/Environment/WWO_TileMap.png');
            this.load.image('log_end', '/assets/Environment/Log_End_Left.png');
            this.load.image('log_middle', '/assets/Environment/Log_Middle.png');

            // characters
            this.load.image('Tank_0001','/assets/Imgs/Cars/Tank-0001.png');
            this.load.image('Car_0001','/assets/Imgs/Cars/Car_sprite_01.png');
            this.load.image('bullet','/assets/Imgs/Bullet/Bullet_Single.png');

            //audio
            this.load.audio('InLevelBGM','/assets/Sounds/Level BGM2-Weapons.mp3');
            this.load.audio('PlayerKilled','/assets/Sounds/Male Death Cry.wav');
            this.load.audio('ReachedGoal','/assets/Sounds/Level Complete.wav')


        } catch (error) {
            alert(error.message);
        }
        this.frog.preload();

    }

    create(){

        const level1 = 
        [
            [7,7,3,10,14,7,7,7,7,7,7,0,7,7,7],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [4,4,3,10,14,7,7,7,7,7,7,0,7,7,7],
            [11,11,11,11,14,7,7,7,7,7,7,0,7,7,7],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [7,7,7,10,7,7,7,7,7,7,7,0,7,7,7],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [7,3,2,10,2,2,14,7,7,3,2,0,2,2,7],
            [7,3,2,10,2,2,14,7,7,3,2,0,2,2,7],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [7,7,7,10,7,7,7,7,7,7,7,0,7,7,7],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
            [4,4,4,4,4,4,4,4,4,4,4,0,4,4,4],
            [7,7,7,10,7,7,7,7,7,7,7,0,7,7,7],
            [2,2,2,10,2,2,2,2,2,2,2,0,2,2,2],
            [13,13,13,10,13,13,13,13,13,13,13,13,13,13,13],
            [7,7,3,10,14,7,7,7,7,7,7,0,7,7,7],
            [4,4,3,10,14,4,4,4,4,4,4,0,4,4,4],
            [2,2,3,10,14,2,2,2,2,2,2,0,2,2,2],
        ];
    
        const map = this.make.tilemap({
            data: level1,
            tileWidth: 32, 
            tileHeight: 32 
        });
        const tiles = map.addTilesetImage('frogger_tiles');
        const layer = map.createStaticLayer(0, tiles, 0, 0);

        this.Goal= this.physics.add.sprite(32*7 +16 ,0+16,'Goal');
    
        // The player and its settings

        this.logLines = [
            //new LogLines(4,3,this.baseSpeed,[2,5],['log_end','log_middle'],this),
           // new LogLines(5,2,this.baseSpeed-1,[2,4],['log_end','log_middle'],this),
           // new LogLines(7,2,this.baseSpeed+1,[3,5],['log_end','log_middle'],this),
           // new LogLines(8,4,this.baseSpeed,[2,2],['log_end','log_middle'],this)
        ];

        //creating Timer objects
        this.TimerText = this.add.text(0,0,'Time : 100',this);
        this.TimerValue = 100;
        //timer event set for 100 secs
        this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });

        //load sound objects
        this.loadSoundHandlers();

        this.frog.create(level1);
        let thisScene = this;
        // bullet pull
        this.carLines = [
            new CarLine(2,2,this.baseSpeed+1,2,'Tank_0001',this,this.timer, true),
            new CarLine(5,3,this.baseSpeed+1,1,'Car_0001',this,this.timer, false),
            new CarLine(7,1,this.baseSpeed+2,2,'Tank_0001',this,this.timer, true),
            new CarLine(8,2,this.baseSpeed-1,1,'Car_0001',this,this.timer, false),
            new CarLine(11,3,this.baseSpeed-1,2,'Tank_0001',this,this.timer, true),
            new CarLine(13,2,this.baseSpeed,1,'Car_0001',this,this.timer, false),
            new CarLine(14,3,this.baseSpeed-1,2,'Tank_0001',this,this.timer, true),
            new CarLine(18,1,this.baseSpeed+1,2,'Tank_0001',this,this.timer, true)
        ];
        this.pool = new BulletPool(30,this.frog,this, this.timer);
        this.pool.bullets.forEach(function(element) {
           thisScene.bullets.push(element.sprite);
          });

          this.carLines.forEach(element => {
            element.pool = this.pool;
        });

        //this.pool.GenerateNextBullet(240,16,false);
        //Overlapping with the goal
        this.physics.add.overlap(this.frog.sprites,this.Goal,this.OnReachingGoal,null,this);
        this.physics.add.overlap(this.frog.sprites,this.bullets,this.hitBullet,null,this);

        // //  Input Events
        // this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if(!this.endTimer)
            this.TimerText.text = "Time : " + Math.floor(100-(this.timer.getElapsed()/1000));
        
        if(!this.paused)
        {
            // update bullet
            this.pool.bullets.forEach(element => {
                if(element.canMove){
                    element.UpdatePosition();
                }
            });
            // pool to generate bullet from top
        //    this.pool.GenerateBulletFromTop(3000);

            this.frog.update(this.input.keyboard.createCursorKeys());
            
        
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.frog.getBounds(), this.Goal.getBounds())) 
            {
                this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
            }
            var inY = this.frog.playerInY;
            var inX = this.frog.playerInX;
            
            
            // drawing carlines
            this.carLines.forEach(function(element) {
                element.drawCar();
                if(element.canShoot && inY != element.row-2 && inY!= element.row)
                    element.generateBullet(2000, inX);
              });

              // draw logs
            this.logLines.forEach(element => {
                element.drawLogLines();
            });

             // collision with car
              for(var i=0;i<this.carLines.length;i++){
                  for(var j=0;j<this.carLines[i].amount;j++){
                    if(!this.frog.isDie && Collision.ACollideB(this.frog.collider, this.carLines[i].colliders[j])){
                        //console.log("collide with: " + "line" + i.toString() + " collider: " + j.toString());
                        console.log(this.carLines[i].colliders[j]);
                        console.log(this.frog.collider);
                        this.frog.die();
                        this.paused = true;
                        this.playPlayerKilledMusic();
                        //this.printLoseScreen();
                    }
                  }
              }
              this.frog.moveAlongLog(0);
              this.frog.onlog = false;
              // collision with logs
              for(var i=0;i<this.logLines.length;i++){
                
                for(var j=0;j<this.logLines[i].amount;j++){
                  if(Collision.AContainsB(this.logLines[i].colliders[j], this.frog.collider)){
                    var spd= this.logLines[i].speed * this.logLines[i].dir;
                   // console.log(spd);
                    this.frog.moveAlongLog(spd);
                    this.frog.onlog = true;
                  }
                }
                
            }

            // if in water(tile id = 3), die
            if(false){//this.frog.inArea[0] == 3 && !this.frog.onlog && this.frog.isMoveDone){
                this.frog.die();
                this.paused = true;
                this.playPlayerKilledMusic();
                //this.printLoseScreen();
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
    loadSoundHandlers(){
        //creating sound variables
        this.bgmMusic = this.sound.add('InLevelBGM');
        this.winMusic = this.sound.add('ReachedGoal');
        this.loseMusic = this.sound.add('PlayerKilled');
        
        //start playing level bgm
        this.bgmMusic.play(this.audioConfig);
    }
    OnReachingGoal(){
        
        //this.Goal.alpha = 0;
         //playing win music
         if(!this.reachedGoal){
         this.playPlayerWonMusic();
        }
        
        this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
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
    playPlayerWonMusic(){
        //stop bgm music
        if(this.bgmMusic.isPlaying)
        {
            this.bgmMusic.stop();
        }

        this.winMusic.play();
        this.reachedGoal = true;
      
         
        
    }
    hitBullet(){
        this.frog.die();
        this.paused = true;
        this.playPlayerKilledMusic();
        //console.log("Hit a bullet");
    }


}
