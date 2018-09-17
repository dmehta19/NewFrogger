import 'phaser'

/*
    The Frog Class for all the logic about Frog
*/

export class Frog
{
    constructor (_scene){
       // super({key:"Frog"});
        this.PositionX = 128;  // Start PositionX
        this.PositionY = 464;  // Start PositionY
        this.scene = _scene;   // Level scene from LEVEL class
        this.MoveDis = 32;     // Each Step moving Distance
        this.MaxSpeed = 2;     // Max speed for moving speed
        this.speedX = 0;       // Speed for X
        this.speedY = 0;       // Speed for Y
        this.sprites;          // Frog sprites from LEVEL class
        this.isMoving;         // Check if it's moving
        this.isMoveDone;        // Check if this movement is done;
        this.TravelDis;
        this.isDie = false;        // Traveled Distance for count.
        this.width = 20;
        this.height = 20;
        this.collider = new Phaser.Geom.Rectangle(this.PositionX-this.width/2+16, this.PositionY-this.height/2+16,this.width, this.height);

        this.alongSpd = 0;
        this.onlog = false;

        // map data
        this.area;
        this.mapHei;
        this.mapWid;
        // 4 size array to represent where player is
        this.inArea = [];
    }


    preload()
    {
        // preload the frog assets.
        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');

    } 

    create(map)
    {
        this.area = map;
        this.mapHei = this.area.length;
        this.mapWid = this.area[0].length;

        console.log(this.mapHei);
        console.log(this.mapWid);

        // Render the frog to the screen
        if (!this.isDie)
        {this.sprites = this.scene.physics.add.sprite(this.PositionX,this.PositionY,'frog');}
            this.collider =new Phaser.Geom.Rectangle(this.sprites.x-this.width/2+16, this.sprites.y-this.height/2+16,this.width, this.height);
           
        // Create the control keys dict
        this.cursors = this.scene.input.keyboard.addKeys({
            'UP' : Phaser.Input.Keyboard.KeyCodes.UP,
            'DOWN' : Phaser.Input.Keyboard.KeyCodes.DOWN,
            'LEFT' : Phaser.Input.Keyboard.KeyCodes.LEFT,
            'RIGHT' : Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })
        this.updateArea();
    }
    update()
    {
        // To Check if it's moving.
        if (!this.isDie)
        {

            // move along log
            if(this.alongSpd != 0){
                this.sprites.x += this.alongSpd;
                if (this.sprites.x < 16) { this.sprites.x  = 16; this.alongSpd = 0;} // Block the frog move out from the screen. // TODO remove the Magic Numb   // WARNING Magic Number 16
                else if (this.sprites.x > 464) { this.sprites.x  = 464; this.alongSpd = 0;} 
                this.collider = new Phaser.Geom.Rectangle(this.sprites.x-this.width/2+16, this.sprites.y-this.height/2+16,this.width, this.height);

                this.updateArea();
            }

            if (this.isMoving && Math.abs(this.TravelDis)<this.MoveDis)
            {
                // Update the sprites position
                this.TravelDis += this.speedX;
                this.sprites.x += this.speedX;
                this.TravelDis += this.speedY;
                this.sprites.y += this.speedY;
                //console.log(this.TravelDis);
                if (this.sprites.x < 16) { this.sprites.x  = 16; this.speedX = 0; this.TravelDis = 0; this.isMoving = false;} // Block the frog move out from the screen. // TODO remove the Magic Numb   // WARNING Magic Number 16
                else if (this.sprites.x > 464) { this.sprites.x  = 464; this.speedX = 0; this.TravelDis = 0; this.isMoving = false;} 
                else if (this.sprites.y < 16) { this.sprites.y  = 16; this.speedY = 0; this.TravelDis = 0; this.isMoving = false;} 
                else if (this.sprites.y > 464) { this.sprites.y  = 464; this.speedY = 0; this.TravelDis = 0; this.isMoving = false;} 
            
                this.collider = new Phaser.Geom.Rectangle(this.sprites.x-this.width/2+16, this.sprites.y-this.height/2+16,this.width, this.height);
                //console.log(this.collider);
            }
            else
            {
                if(this.isMoving && !this.isMoveDone){
                    this.updateArea();
                    this.isMoveDone = true;
                }
                // Stop the frog
                this.speedX = 0;
                this.speedY = 0;
                this.TravelDis = 0;
                this.isMoving = false;
            }


            // Bind the keyboard input to increasing speed.
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
        }
    }

    die()
    {
        if (!this.isDie){
            this.isDie = true;
            console.log("Player Dies!");
        }
            
    }
    getBounds()
    {
        return this.sprites.getBounds();
    }

    moveAlongLog(i_spd){
        this.alongSpd = i_spd;

    }

    updateArea(){
        var playerInX = Math.floor(15*this.sprites.x/480);
        var playerInY = Math.floor(15*this.sprites.y/480);

        this.inArea = [
            this.area[playerInY][playerInX]
        ];
        
        console.log("X: " + playerInX + " Y: " + playerInY + " in area: " +this.inArea[0]);

    }
    
}