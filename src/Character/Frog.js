import 'phaser'

export class Frog
{
    constructor (_scene){
       // super({key:"Frog"});
        this.PositionX = 100;
        this.PositionY = 450;
        this.Velocity;
        this.scene = _scene;
        this.MoveDis = 8;
        this.speedX = 0;
        this.speedY = 0;
        this.sprites;
        this.isMoving;
        this.TravelDis
    }


    preload()
    {

        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');

        //alert("called");
    } 

    create()
    {
        this.sprites = this.scene.add.sprite(this.PositionX,this.PositionY,'frog');
        this.cursors = this.scene.input.keyboard.addKeys({
            'UP' : Phaser.Input.Keyboard.KeyCodes.UP,
            'DOWN' : Phaser.Input.Keyboard.KeyCodes.DOWN,
            'LEFT' : Phaser.Input.Keyboard.KeyCodes.LEFT,
            'RIGHT' : Phaser.Input.Keyboard.KeyCodes.RIGHT,
        })
    }
    update()
    {
        
        if (this.isMoving && (this.TravelDis <= 8))
        {
            this.TravelDis += this.speedX;
            this.sprites.x = this.PositionX + this.TravelDis;
            this.TravelDis += this.speedY;
            this.sprites.y = this.PositionY + this.TravelDis;
            console.log(this.speedX);
        }
        
        if (this.TravelDis>=8)
        {
            this.speedX = 0;
            this.speedY = 0;
            this.TravelDis = 0;
            this.isMoving = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors['LEFT']) && !this.isMoving)
        {
            this.speedX = 0;
            this.isMoving = true;
        }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['RIGHT']))
        // {

        // }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['UP']))
        // {

        // }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors['DOWN']))
        // {
        //     this.PositionY += this.MoveDis;
        //     this.sprites.y = this.PositionY;
        // }
    }
    
}