import 'phaser';

export class TheLog{
    constructor(i_length,s_endName,s_midName,_game){
        this.length = i_length;
        if(i_length < 2)
            this.length = 2;
        this.game = _game;
        this.logSprites = [];
        var defaultX = 32;

        // init the first one
        this.logSprites.push(_game.add.sprite(defaultX+0,defaultX+0,s_endName));
        if(this.length>=3){
            for(var i=1;i<i_length-1;i++){
                this.logSprites.push(this.game.add.sprite(defaultX+i*32,defaultX+0,s_midName));
            }
        }
        this.logSprites.push(this.game.add.sprite(defaultX+(i_length-1)*32,defaultX+0,s_endName));
        // flip the last one
        this.logSprites[this.length-1].flipX = true;


    }
}