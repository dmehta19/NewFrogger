import 'phaser';

export class Collision{

    static ACollideB(obj_a,obj_b){

        if(Phaser.Geom.Rectangle.ContainsRect(obj_a,obj_b))
            return ture;

        return false;
    }
    
}