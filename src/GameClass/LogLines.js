import 'phaser';
import { TheLog } from './TheLog';

export class LogLines{
    constructor(i_line, i_amount,i_speed, ia_minAndMax,sa_names,_game){
        this.line = i_line;
        this.amount = i_amount;
        this.speed = i_speed;
        this.game = _game;
        this.dir = (this.line%2==0)?1:-1;
        this.boundary = [-128,480];

        // the array of TheLog
        this.LogsSprites = [];
        // positions
        this.positions = [];
        // collider array
        this.colliders = [];

        // init logs sprite
        for(var i = 0;i < this.amount;i++){
            var temp = new TheLog(Math.floor(Math.random()*(ia_minAndMax[1] - ia_minAndMax[0])) + ia_minAndMax[0],sa_names[0],sa_names[1],_game);
            this.LogsSprites.push(temp);
        }
        // init the position of logs
        var prevX = 0;
        for(var i = 0; i< this.amount;i++){
            var interval = Math.floor((Math.random()*64 +32));
            prevX += (i==0?0:this.LogsSprites[i-1].length)*32;
            for(var j=0;j<this.LogsSprites[i].length;j++){
                
                this.LogsSprites[i].logSprites[j].x = prevX +interval*i + j*32 +16;
                this.LogsSprites[i].logSprites[j].y = this.line*32 - 16;
            }
            this.positions.push(this.LogsSprites[i].logSprites[0].x);
        }

        // init the collider of logs
        for(var i = 0; i< this.amount;i++)
        {
            this.colliders.push(
                new Phaser.Geom.Rectangle(this.positions[i]-16+16,
                    this.line*32 - 32+16,
                    this.LogsSprites[i].length*32,
                    32));
            
        }
    
    }

    drawLogLines(){
                // update position
                for(var i = 0; i<this.amount;i++){
                    this.positions[i] += this.dir*this.speed;
                    if(this.positions[i] > this.boundary[1] && this.dir>0){
                        this.positions[i] = this.boundary[0];
                    }
        
                    if(this.positions[i]<this.boundary[0] && this.dir<0){
                        this.positions[i] = this.boundary[1];
                    }

                    this.colliders[i] = new Phaser.Geom.Rectangle(this.positions[i]-16+16,this.line*32 - 32+16,this.LogsSprites[i].length*32,32);

                    // assign position
                    for(var j=0;j<this.LogsSprites[i].length;j++){
                        this.LogsSprites[i].logSprites[j].x =this.positions[i]+ j*32;
                    }
                }
    }
}