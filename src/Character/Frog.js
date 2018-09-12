
export class Frog
{
    constructor (_scene){
       // super({key:"Frog"});
        this.PositionX = 100;
        this.PositionY = 450;
        this.Velocity;
        this.scene = _scene;
        this.speed = 1;
        this.sprites;


    }


    preload()
    {

        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');

        //alert("called");
    } 

    create()
    {
        this.sprites = this.scene.add.sprite(this.PositionX,this.PositionY,'frog');
    }
    update(cursors)
    {
        if (cursors.left.isDown)
        {
            this.PositionX -= this.speed;
            this.sprites.x = this.PositionX;
        }
        if (cursors.right.isDown)
        {
            this.PositionX += this.speed;
            this.sprites.x = this.PositionX;
        }
        if (cursors.up.isDown)
        {
            this.PositionY -= this.speed;
            this.sprites.y = this.PositionY;
        }
        if (cursors.down.isDown)
        {
            this.PositionY += this.speed;
            this.sprites.y = this.PositionY;
        }

    }
    getBounds()
    {
        return this.sprites.getBounds();
    }
    
}