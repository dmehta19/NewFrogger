import {Frog} from "./Character/Frog"; 
import { CarLine } from "./CarLine";
import { Collision } from "./Engine/Collision";
import { LogLines } from "./GameClass/LogLines";
import { BulletPool } from "./GameClass/BulletPool";

export class level1 extends Phaser.Scene{
    
    constructor (){
        super({key:"level1"});
        this.frog;
        this.gameStartScene;
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
        this.goalObstacle;
        this.isGameStarted = false;

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
        this.isGameStarted = false;
        this.goalOpen = false;
        this.playerKilled = false;
        this.reachedGoal = false;

        this.load.image('Goal','/assets/Environment/Goal_Tile_Old.png');
        try {
            // environments
            this.load.image('frogger_tiles', '/assets/Environment/WWO_TileMap.png');
            this.load.image('log_end', '/assets/Environment/Log_End_Left.png');
            this.load.image('log_middle', '/assets/Environment/Log_Middle.png');
            this.load.image('Obstacle','/assets/Environment/Barb_Wire_Front-export.png');
            this.load.image('Collectible','/assets/Character/soilder/Collectible.png')
            this.load.image('Tent','/assets/Environment/Tent.png')

            //scenes
            this.load.image('GameStart','/assets/Scenes/GameStart.png')


            // characters
            this.load.image('Tank_0001','/assets/Imgs/Cars/Tank-0001.png');
           
            this.load.spritesheet('tankSheet', '/assets/Imgs/Cars/Tank-0002.png',
            { frameWidth: 64, frameHeight: 32, endFrame: 1 });
           
            this.load.image('Car_0001','/assets/Imgs/Cars/Jeep_Sprite.png');
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
           this.loadCollectibles();
       


            //Load collision events
            this.loadCollisionHandlers();

            //Load sound objects
            this.loadSoundHandlers();
           
            //Load Animation
            this.loadAnimation();

            this.LoadGameStart();

            this.input.keyboard.on('keydown_SPACE',this.onSPaceDown, this);
        // bullet pull

        // //  Input Events
        // this.cursors = this.input.keyboard.createCursorKeys();
    }

    LoadGameStart(){
        this.gameStartScene = this.add.sprite(240,336,'GameStart');
    }
    onSPaceDown(){
        console.log("pressed space");
        if(!this.isGameStarted){
          this.isGameStarted = true;
          this.gameStartScene.visible = false; 
        }
    }

    update()
    {
       // if (Phaser.Input.Keyboard.JustDown( Phaser.Input.Keyboard.KeyCodes.))
       //     {
//
      //      } 
        if(this.isGameStarted){
        
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

           
            var inY = this.frog.playerInY;
            var inX = this.frog.playerInX;
            
            
           // this.pool.GenerateBulletFromTop(15000);


           
           
            // drawing carlines
            this.carLines.forEach(function(element) {
                element.drawCar();
                if(element.canShoot && inY!= element.row-2 && inY!= element.row && inY!= element.row-3 && inY!= element.row+1)
                element.generateBullet(3500, inX);
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
        if(!this.endTimer)
            this.TimerText.text = "Time : " + Math.floor(150-(this.timer.getElapsed()/1000));
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
    playPlayerKilledMusic(){

        //only play for the first time this is called
        if(!this.playerKilled)
        {
            this.loseMusic.play();
            //

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
        

        if(this.goalOpen){
         //playing win music
         if(!this.reachedGoal){
         this.playPlayerWonMusic();
        }
        
        this.time.addEvent({delay : 1000 , callback: this.printWinScreen, callbackScope: this });
    }
    }

    loadAnimation(){
        var config = {
            key: 'TankRoll',
            frames: this.anims.generateFrameNumbers('tankSheet', { start: 0, end: 1, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        this.anims.create(config);
    }

    loadTileMap(){
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

        this.Goal= this.physics.add.sprite(32*6 +16 ,32*20 +16,'Tent');
        this.goalObstacle = this.physics.add.sprite(32*6 +16 ,32*20 +16,'Obstacle');
         //Load Timer event
         this.loadTimer();

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
         this.timer = this.time.addEvent({delay : 150000 , callback: this.printLoseScreen, callbackScope: this });

         

        // bullet pull

    }

    loadMovingObjects(level1){

        

       //moving cars
       this.carLines = [
        new CarLine(2,2,this.baseSpeed+1,2,'TankRoll',this,this.timer, true),
        new CarLine(5,2,this.baseSpeed+1,2,'Car_0001',this,this.timer, false),
        new CarLine(7,1,this.baseSpeed+2,2,'TankRoll',this,this.timer, true),
        new CarLine(8,2,this.baseSpeed-1,2,'Car_0001',this,this.timer, false),
        new CarLine(11,3,this.baseSpeed-1,2,'TankRoll',this,this.timer, true),
        new CarLine(13,2,this.baseSpeed,2,'Car_0001',this,this.timer, false),
        new CarLine(14,3,this.baseSpeed-1,2,'TankRoll',this,this.timer, true),
        new CarLine(18,1,this.baseSpeed+1,2,'TankRoll',this,this.timer, true)
    ];

       //Moving logs
       this.logLines = [
           //new LogLines(4,3,this.baseSpeed,[2,5],['log_end','log_middle'],this),
         //  new LogLines(5,2,this.baseSpeed-1,[2,4],['log_end','log_middle'],this),
         //  new LogLines(7,2,this.baseSpeed+1,[3,5],['log_end','log_middle'],this),
         //  new LogLines(8,4,this.baseSpeed,[2,2],['log_end','log_middle'],this)
       ];

      
       // The player and its settings
       let thisScene = this;
       this.frog.create(level1);
       this.pool = new BulletPool(30,this.frog,this, this.timer);
       this.pool.bullets.forEach(function(element) {
          thisScene.bullets.push(element.sprite);
         });

         let thePool = this.pool;   
         this.carLines.forEach(element => {
            element.pool = thePool;
        }); 


   }

    loadCollisionHandlers(){

        this.physics.add.overlap(this.frog.sprites,this.bullets,this.hitBullet,null,this);
        //Colliding with obstacles
        this.physics.add.overlap(this.frog.sprites,this.obstacles,this.hitObstacle,null,this);
        this.physics.add.overlap(this.frog.sprites,this.goalObstacle,this.hitObstacle,null,this);
        let thisScene = this; 
        this.pool.bullets.forEach(element => {
            thisScene.physics.add.overlap(element.sprite,thisScene.obstacles,thisScene.smashBullet,null,thisScene);
            thisScene.physics.add.overlap(element.sprite,thisScene.goalObstacle,thisScene.smashBullet,null,thisScene);
        });
       
           
      
        //Overlapping with the goal
        this.physics.add.overlap(this.frog.sprites,this.Goal,this.OnReachingGoal,null,this);
        this.physics.add.overlap(this.frog.sprites, this.Collectibles,this.collectCollectibles, null, this);
        this.physics.add.overlap(this.obstacles,this.Collectibles,this.smashObstacle,null,this);
        //Collision with bullets
        // this.bullets.forEach(function(element) {
        //     thisScene.bullets.push(element.sprite);
        //    });

        // }
      
    }

    loadStaticObstacles(level1){
         //Looking for hazards and obstacles and adding them to the respective array objects
         for(var i= 1;i<18;i++){
             var j=0; var k,l;

             //checking for halfgrass tile -> level1[][]==4 or road -- tile id = 13
             if(level1[i][j]==4|| i== 3||i==9 ||i==16){
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
        for(var j=0;j<15;j++){
            if(j!=6){
                this.obstacles.push(this.physics.add.sprite(32*j + 16,32*20 + 16,'Obstacle'));
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
        
        if(this.collected == 4){
            this.goalOpen = true;
            this.goalObstacle.disableBody(true,true);
        }

    }
    smashObstacle(obstacle,Collectible){
        obstacle.disableBody(true,true);
    }

    loadCollectibles(){
    this.Collectibles = this.physics.add.group();
    var row0,row5,row8,row15;
   
    row0 = this.randomIntFromInterval(5,14);
    // if(row0 == 11)
    //     row0 = 13;
    row5 =  this.randomIntFromInterval(0,14);  
    // if(row5 == 3 || row5== 11)
    //     // row5 = 2;
    row15  =  this.randomIntFromInterval(0,14);  
    // if(row15 == 3 || row15== 11)
    //     row15 = 2;   
    row8 = this.randomIntFromInterval(0,2) ;
    // if(row8 == 2)
    //     row8 = 14;

    this.Collectibles.create(32*row0 +16, 16,'Collectible');
    this.Collectibles.create(32 * row5 +16, 32 * 5 + 16,'Collectible');
    this.Collectibles.create(32 * row8 +16, 32 * 8 + 16,'Collectible');
    this.Collectibles.create(32 * row15 +16, 32 * 15 + 16,'Collectible');
    }
   
    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    smashBullet(bullet,obstacle){
        //console.log(i_id);
        console.log("smashed bulklet");
        bullet.disableBody(true,true); 

    }

}
