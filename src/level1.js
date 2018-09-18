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
        this.level1 = [];

        this.Collectibles;
        this.collected;

         //Load all obstacles into this array
         this.obstacles=[];

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
        
        this.collected = 0;
        this.endTimer = false;
        this.paused = false;
        this.loss = false;

        //set to false at the start of the level
        this.playerKilled = false;
        this.reachedGoal = false;

        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
        try {
            // environments
            this.load.image('frogger_tiles', '/assets/Environment/Frogger_TileMap.png');
            this.load.image('log_end', '/assets/Environment/Log_End_Left.png');
            this.load.image('log_middle', '/assets/Environment/Log_Middle.png');
            this.load.image('Obstacle','/assets/Environment/Barb_Wire_Front-export.png');
            this.load.image('Collectible','/assets/Environment/Barb_Wire_Side.png')

            // characters
            this.load.image('Car_sprite_01','/assets/Imgs/Cars/Tank-0001.png');
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

       
            //Load TileMap and player and moving objects
            this.loadTileMap();

            //Collectibles
            this.Collectibles = this.physics.add.group();
            this.Collectibles.create(16, 32 * 11 + 16,'Collectible');
            this.Collectibles.create(32 * 14 +16, 32 * 8 + 16,'Collectible');
            this.Collectibles.create(32 * 14 +16, 32 * 2 + 16,'Collectible');
       
            //Load Timer event
            this.loadTimer();

            //Load collision events
            this.loadCollisionHandlers();

            //Load sound objects
            this.loadSoundHandlers();


       
        
        //this.pool.GenerateNextBullet(240,16,false);
        

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
            this.pool.GenerateBulletFromTop(15000);


           
           
            // drawing carlines
            this.carLines.forEach(function(element) {
                element.drawCar();
              });

              // draw logs
            this.logLines.forEach(element => {
                element.drawLogLines();
            });

             //frog stuff
             this.frog.update(this.input.keyboard.createCursorKeys());

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
            if(this.frog.inArea[0] == 3 && !this.frog.onlog && this.frog.isMoveDone){
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
    OnReachingGoal(){
        

        if(this.collected ==3){
         //playing win music
         if(!this.reachedGoal){
         this.playPlayerWonMusic();
        }
        
        this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
    }
    }

    loadTileMap(){
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
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];
    
        const map = this.make.tilemap({
            data: level1,
            tileWidth: 32, 
            tileHeight: 32 
        });
        const tiles = map.addTilesetImage('frogger_tiles');
        const layer = map.createStaticLayer(0, tiles, 0, 0);

        this.Goal= this.physics.add.sprite(32*7 +16 ,0+16,'Goal');

         //load static obstacles
         this.loadStaticObstacles(level1);

         //load moving objects (cars and logs and player)
         this.loadMovingObjects(level1);

         
        
    
        
    }

    loadSoundHandlers(){
        //creating sound variables
        this.bgmMusic = this.sound.add('InLevelBGM');
        this.winMusic = this.sound.add('ReachedGoal');
        this.loseMusic = this.sound.add('PlayerKilled');
        
        //start playing level bgm
        this.bgmMusic.play(this.audioConfig);
    }
    
    

    loadTimer(){
         //creating Timer objects
         this.TimerText = this.add.text(0,0,'Time : 100',this);
         this.TimerValue = 100;
         //timer event set for 100 secs
         this.timer = this.time.addEvent({delay : 100000 , callback: this.printLoseScreen, callbackScope: this });

         
        let thisScene = this;
        // bullet pull
        this.pool = new BulletPool(30,this.frog,this, this.timer);
        this.pool.bullets.forEach(function(element) {
           thisScene.bullets.push(element.sprite);
          });
    }

    loadMovingObjects(level1){

        

       //moving cars
       this.carLines = [
           new CarLine(2,2,this.baseSpeed+1,2,'Car_sprite_01',this),
           new CarLine(10,3,this.baseSpeed+1,2,'Car_sprite_01',this),
           new CarLine(11,1,this.baseSpeed+2,2,'Car_sprite_01',this),
           new CarLine(13,2,this.baseSpeed-1,2,'Car_sprite_01',this),
           new CarLine(14,3,this.baseSpeed-1,2,'Car_sprite_01',this)
           
           
       ];

       //Moving logs
       this.logLines = [
           new LogLines(4,3,this.baseSpeed,[2,5],['log_end','log_middle'],this),
           new LogLines(5,2,this.baseSpeed-1,[2,4],['log_end','log_middle'],this),
           new LogLines(7,2,this.baseSpeed+1,[3,5],['log_end','log_middle'],this),
           new LogLines(8,4,this.baseSpeed,[2,2],['log_end','log_middle'],this)
       ];

      
       // The player and its settings
       this.frog.create(level1);

   }

    loadCollisionHandlers(){
        //Colliding with obstacles
        this.physics.add.overlap(this.obstacles,this.frog.sprites,this.hitObstacle,null,this);

        //Overlapping with the goal
        this.physics.add.overlap(this.frog.sprites,this.Goal,this.OnReachingGoal,null,this);

        
        this.physics.add.overlap(this.frog.sprites, this.Collectibles,this.collectCollectibles, null, this);
        //Collision with bullets
        // this.bullets.forEach(function(element) {
        //     thisScene.bullets.push(element.sprite);
        //    });

        // }
        this.physics.add.overlap(this.frog.sprites,this.bullets,this.hitBullet,null,this);
    }

    loadStaticObstacles(level1){
         //Looking for hazards and obstacles and adding them to the respective array objects
         for(var i= 0;i<15;i++){
             var j=0; var k,l;
             if(level1[i][j]==9){
               j= this.getRandomInt(5);
               k= this.getRandomInt(10);
               l = this.getRandomInt(15);
                if(j!=k  && k!=l && j!=l){
                    this.obstacles.push(this.physics.add.sprite(32*j + 16,32*i + 16,'Obstacle'));
                    this.obstacles.push(this.physics.add.sprite(32*k + 16,32*i + 16,'Obstacle'));
                    this.obstacles.push(this.physics.add.sprite(32*l + 16,32*i + 16,'Obstacle'));

                }

             }
            
        }

    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      hitObstacle(){

        
       // returning to previous position because of collision
        this.frog.returnToPrevPosition();
    }

    hitBullet()
    {
        
        this.frog.die();
        this.paused = true;
        this.playPlayerKilledMusic();
        //console.log("Hit a bullet");
    }
    collectCollectibles(frogger_tiles,Collectible){
        this.collected++;
        Collectible.disableBody(true,true);

    }

}
