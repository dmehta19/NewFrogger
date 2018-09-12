
export class Frog
{
    constructor (_scene){
       // super({key:"Frog"});
        this.PositionX = 32*8;
        this.PositionY = 32*10;
        this.Velocity;
        this.scene = _scene;
        this.speed = 1;
        this.sprites;

        this.FrogPhysicsObject;
    }


    preload()
    {
        

        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');

        //alert("called");
    } 

    create()
    {
        
       
        this.sprites = this.scene.physics.add.sprite(this.PositionX,this.PositionY,'frog');
        console.log(this.sprites.getBounds());
      
        this.sprites.setCollideWorldBounds(true);
    }
    update(cursors)
    {
        if (cursors.left.isDown)
        {
            //this.PositionX -= this.speed;
            this.sprites.x -= this.speed;
        }
        if (cursors.right.isDown)
        {
            //this.PositionX += this.speed;
            this.sprites.x += this.speed;
        }
        if (cursors.up.isDown)
        {
           // this.PositionY -= this.speed;
            this.sprites.y -= this.speed;
        }
        if (cursors.down.isDown)
        {
            //this.PositionY += this.speed;
            this.sprites.y += this.speed;
        }

    }
    getBounds()
    {
        return this.sprites.getBounds();
    }
    
}