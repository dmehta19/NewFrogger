export class Frog
{
    constructor (StartPosition,_scene){
        //super({key:"Frog"});
        this.Position = StartPosition;
        this.Velocity;
        this.scene = _scene;
    }

    preload()
    {
        this.scene.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');
        //alert("called");
    } 

    create()
    {
    }
    update(cursors)
    {
        if (cursors.left.isDown)
        {
            this.Position += (-32,0);
        }
    }
    
}