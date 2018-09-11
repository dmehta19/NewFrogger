import 'phaser';
import { TheLog } from './TheLog';

export class LogLines{
    constructor(i_line, i_amount,i_speed, ia_minAndMax,sa_names,_game){
        this.line = i_line;
        this.amount = i_amount;
        this.speed = i_speed;
        this.game = _game;

        // the array of TheLog
        this.LogsSprites = [];

        // init logs sprite
        for(var i = 0;i < this.amount;i++){
            var temp = new TheLog(Math.random()*(ia_minAndMax[1] - ia_minAndMax[0]) + ia_minAndMax[0],sa_names[0],sa_names[1],_game);
            this.LogsSprites.push(temp);
        }
        // init the position of logs
        for(var i = 0; i< this.amount;i++){
            var interval = 30;
            for(var j=0;j<this.LogsSprites[i].length;j++){
                this.LogsSprites[i].logSprites[j].x = i*32*(this.LogsSprites[i].length-1) + j*32 + 16;
                this.LogsSprites[i].logSprites[j].y = this.line*32 - 16;
            }
        }
    }

    drawLogLines(){
        
    }
}