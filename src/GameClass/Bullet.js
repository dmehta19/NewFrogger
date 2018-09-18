export class Bullet{
    constructor(i_id,i_x,i_y,i_spd,s_name,_frog,b_isTrack,_game){
        this.id = i_id;
        this.x = i_x;
        this.y = i_y;
        this.speed = i_spd;
        this.isTrack = b_isTrack;
        this.player = _frog;
        this.dir = [0,0];
        this.game = _game;
        this.sprite;

        this.canMove = false;
        // init direction
        if(b_isTrack){
            // the dir point to player
           this.dir[0] = this.player.sprites.x - this.x;
           this.dir[1] = this.player.sprites.y - this.y;
        }else{
            // the dir point 
            this.dir[0] = 0;
            this.dir[1] = this.player.sprites.y - this.y;

            if(this.dir[1]<0)
            this.sprite.flipY = true;
        }

        this.normalizeDir();

       
        // create sprite
        this.sprite = this.game.physics.add.sprite(this.x,this.y,s_name);
        this.sprite.visible = false;
        
        this.sprite.flipY = this.dir[1]<0?true:false;
    }

    
    normalizeDir(){
        var mag = Math.sqrt(this.dir[0]*this.dir[0] + this.dir[1] *this.dir[1]);
        this.dir = [ this.dir[0]/mag, this.dir[1]/mag]; 
    }

    UpdatePosition(){
        if(this.canMove)
            this.sprite.x += this.dir[0] * this.speed;
            this.sprite.y += this.dir[1] * this.speed;

        if(this.sprite.x > 480 || this.sprite.x < -32 || 
            this.sprite.y < -32 || this.sprite.y > 550){
                // go back to pool because of collision with boundary
                this.GoBackToPool();
                console.log("Bullet" + this.id +" goes back to pool because of out of boundary");
            }
    }

    InstantiateFromPool(i_x,i_y,b_isTrack){
        console.log("Bullet" + this.id +" is instantiated from position (" + i_x + ", " + i_y+")");

        this.x = i_x;
        this.y = i_y;

        this.sprite.x = i_x;
        this.sprite.y = i_y;

        this.isTrack = b_isTrack;
        if(b_isTrack){
            // the dir point to player
           this.dir[0] = this.player.sprites.x - this.x;
           this.dir[1] = this.player.sprites.y - this.y;
        }else{
            // the dir point 
            this.dir[0] = 0;
            this.dir[1] = this.player.sprites.y - this.y;

            this.sprite.flipY = this.dir[1]<0?true:false;

        }

        this.normalizeDir();
        this.sprite.visible = true;
        this.canMove = true;
    }

    GoBackToPool(){
        this.sprite.visible = false;
        this.canMove = false;

    }

    
}