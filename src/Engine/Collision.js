import 'phaser';

export class Collision{

    static ACollideB(rect1, rect2){
        
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
             // collision detected!
             return true;
         }
         return false;
    }

    static AContainsB(rect1,rect2){

        if(rect1.x <= rect2.x 
            && rect1.x + rect1.width >= rect2.x + rect2.width
            && rect1.y <= rect2.y
            && rect1.y + rect1.height >= rect2.y + rect2.height){
                return true;
            }

            return false;
    }
    
}