import { Bullet } from "./Bullet";

export class BulletPool{
    constructor(i_bulletAmount,_frog,_game, _timer){
        this.bullets = [];
        this.player = _frog;
        this.game = _game;
        this.bulletAmount = i_bulletAmount;
        this.timer = _timer;

        this.currentTime = 0;
        this.dropTime = 0;
        this.isCoolDowning = false;

        console.log(_game);

        // init pool
        for(var i =0; i<i_bulletAmount;i++){
            this.bullets.push(new Bullet(i,0,0,2,'bullet',this.player,false,this.game));
        }

        this.NextIdToBeUse = 0;

    }

    GenerateNextBullet(i_x,i_y,b_isTrack){
        this.bullets[this.NextIdToBeUse].InstantiateFromPool(i_x,i_y,b_isTrack);
        this.NextIdToBeUse++;
    }

    GenerateBulletFromTop(i_interval){
        this.currentTime = this.timer.getElapsed(); 

        if(!this.isCoolDowning){
            // shoot bullet
            this.GenerateNextBullet(Math.floor(Math.random()*400 + 40), 16,false);
            this.isCoolDowning = true;
            this.dropTime = this.currentTime + i_interval;
        }
        
        if(this.isCoolDowning){
            if(this.currentTime > this.dropTime){
                // cool down finish
                this.isCoolDowning = false;
            }
        }

    }



}