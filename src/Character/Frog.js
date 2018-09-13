import 'phaser'
export class Frog
{
    constructor (_scene){
       // super({key:"Frog"});
        this.PositionX = 32*8 + 16;
        this.PositionY = 32*10 + 16;
        this.Velocity;
        this.scene = _scene;
        this.speed = 1;
        this.sprites;
        this.MoveDis = 32;     // Each Step moving Distance
        this.MaxSpeed = 2;     // Max speed for moving speed
        this.speedX = 0;       // Speed for X
        this.speedY = 0;       // Speed for Y
        this.LastPositionX;
        this.LastPositionY;                      // Frog sprites from LEVEL class
        this.isMoving;         // Check if it's moving
        this.isMoveDone;       // Check if this movement is done;
        this.TravelDis;

        
    }


    preload()
    {
        

        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');

        //alert("called");
    } 

    create()
    {
        
       
        this.sprites = this.scene.physics.add.sprite(this.PositionX,this.PositionY,'frog');
       this.sprites.setBounce(0.2);
        this.sprites.setCollideWorldBounds(true);
        this.cursors = this.scene.input.keyboard.addKeys({
            'UP' : Phaser.Input.Keyboard.KeyCodes.UP,
            'DOWN' : Phaser.Input.Keyboard.KeyCodes.DOWN,
            'LEFT' : Phaser.Input.Keyboard.KeyCodes.LEFT,
            'RIGHT' : Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })
    }
    update(cursors)
    {
       
        
        
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['LEFT']) )
        // {
        //     this.sprites.setVelocityX(-50);
        //     //this.scene.physics.moveTo(this.sprites,this.sprites.x-2,this.sprites.y,30,1);
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['RIGHT']))
        // {
        //     this.sprites.setVelocityX(50);
        //    // this.scene.physics.moveTo(this.sprites,this.sprites.x+2,this.sprites.y,30,1);
        // }

        
        // if(Phaser.Input.Keyboard.JustDown(this.cursors['UP']) )
        // {
        //    this.sprites.setVelocityY(-50);
        //     //this.LastPositionY = this.sprites.y;
        //     //this.scene.physics.moveTo(this.sprites,this.sprites.x,this.LastPositionY -2,30,1);
            
        // }

        
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['DOWN']) )
        // {
        //     this.sprites.setVelocityY(50);
        //    // this.scene.physics.moveTo(this.sprites,this.sprites.x,this.sprites.y+2,30,1);

        // }

        

       
        this.LastPositionX = this.sprites.x;
        this.LastPositionY = this.sprites.y;

  
            if (this.isMoving && Math.abs(this.TravelDis)<this.MoveDis)
            {
                this.LastPositionX = this.sprites.x;
                this.LastPositionY = this.sprites.y;
                // Update the sprites position
                this.TravelDis += this.speedX;
                this.sprites.x += this.speedX;
                this.TravelDis += this.speedY;
                this.sprites.y += this.speedY;
                //console.log(this.TravelDis);
               
            
               
            }
            else
            {
                if(this.isMoving && !this.isMoveDone){
                  
                    this.isMoveDone = true;
                }
                // Stop the frog
                this.speedX = 0;
                this.speedY = 0;
                this.TravelDis = 0;
                this.isMoving = false;

            }



        if (Phaser.Input.Keyboard.JustDown(this.cursors['LEFT']) && !this.isMoving)
        {
            this.speedX = -this.MaxSpeed;
            this.isMoving = true;
            this.isMoveDone = false;
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors['RIGHT'])&& !this.isMoving)
        {
            this.speedX = this.MaxSpeed;
            this.isMoving = true;
            this.isMoveDone = false;

        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors['UP'])&& !this.isMoving)
        {
            this.speedY = -this.MaxSpeed;
            this.isMoving = true;
            this.isMoveDone = false;

        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors['DOWN'])&& !this.isMoving)
        {
            this.speedY = this.MaxSpeed;
            this.isMoving = true;
            this.isMoveDone = false;

        }
        
        // this.sprites.setVelocityY(0.001);
        // this.sprites.setVelocityX(0.001);

    }
    getBounds()
    {
        return this.sprites.getBounds();
    }
    returnToPrevPosition(){
        this.sprites.x = this.LastPositionX;
        this.sprites.y = this.LastPositionY;
    }
    
}