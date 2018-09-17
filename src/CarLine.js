

export class CarLine{
    constructor(_line, _amount,_speed, _size,_name,_game){
        
        //int: The id of row that this car line stand in
        this.row = _line - 1;
        //int: How many cars in this car line
        this.amount = _amount;
        //float: The speed of the car line
        this.speed = _speed;
        // int: Set positive direction as right, if the line id is even, go right, else go left
        this.dir = (this.row%2==0)?1:-1;
        // int: width of each car
        this.width = _size*32;
        // string: key of the image
        this.name = _name;

        // array: the array to store the X position of all car in this line
        this.positions = [];
        // Phaser.GameObjects.Image: image object of single car
        this.game = _game;
        // load image
        this.sprites = [];
         

        for (var i = 0; i<this.amount; i++){

            var interval = (800 / this.amount);
            var variance = Math.random()*40-80;
            interval += variance;

            this.positions.push(Math.floor(i*interval));
            
        }

        for(var i = 0; i<this.amount; i++){
            this.sprites.push(this.game.physics.add.sprite(this.positions[i] + this.width/2,32*this.row + 16,this.name));
        }
    }

    drawCar(){
        // update position
        for(var i = 0; i<this.amount;i++){
            this.sprites[i].setVelocityX(100 * this.speed);
            //this.positions[i] += this.dir*this.speed;
            // this.positions[i] = this.sprites[i].x;
            // if(this.positions[i] > 800 && this.dir>0){
            //     this.positions[i] = 0;
            // }

            // if(this.positions[i]<0 && this.dir<0){
            //     this.positions[i] = 0;
            // }
            
            //this.sprites[i].x = this.positions[i];
        }

    }
    update(){
        for(var i = 0; i<this.amount;i++){
        if(this.sprites[i].x > 800 ){
           
            this.sprites[i].x= 0;
        }

       
    }
    }
}