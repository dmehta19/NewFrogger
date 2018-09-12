import 'phaser';

export class CarLine{
    constructor(_line, _amount,_speed, _size,_name,_game){
        
        //int: The id of row that this car line stand in
        this.row = _line;
        //int: How many cars in this car line
        this.amount = _amount;
        //float: The speed of the car line
        this.speed = _speed;
        // int: Set positive direction as right, if the line id is even, go right, else go left
        this.dir = (this.row%2==0)?1:-1;
        // int: width of each car
        this.width = _size*24;
        this.height = 20;
        // string: key of the image
        this.name = _name;
        // collider of single car
        this.colliders = [];
        // array of int:boundary
        this.boundary = [-100,500]

        // array: the array to store the X position of all car in this line
        this.positions = [];
        // Phaser.GameObjects.Image: image object of single car
        this.game = _game;
        // load image
        this.sprites = [];

        // init the interval between cars
        for (var i = 0; i<this.amount; i++){

            var interval = (800 / this.amount);
            var variance = Math.random()*40-80;
            interval += variance;

            this.positions.push(Math.floor(i*interval));
            
        }

        // init the sprites array
        for(var i = 0; i<this.amount; i++){
            this.sprites.push(this.game.add.sprite(this.positions[i] + this.width/2,32*this.row-16,this.name));
        }
        // flip horizontally if the moving direction is negative
        for(var i = 0; i<this.amount; i++){
            if(this.dir == -1){
                this.sprites[i].flipX = true;
            }
        }
       
        // init the collider
        for(var i = 0; i<this.amount; i++)
        {
            this.colliders.push(new Phaser.Geom.Rectangle(this.positions[i]+16,this.row*32-32+16,this.width,this.height));
        }


    }

    drawCar(){
        // update position
        for(var i = 0; i<this.amount;i++){
            this.sprites[i].x += this.dir*this.speed;
            if(this.sprites[i].x > this.boundary[1] && this.dir>0){
                this.sprites[i].x = this.boundary[0];
            }

            if(this.sprites[i].x<this.boundary[0] && this.dir<0){
                this.sprites[i].x = this.boundary[1];
            }

            this.colliders[i].x = this.sprites[i].x-this.width/2+16;
            this.colliders[i].y = this.sprites[i].y-this.height/2+16;
            
        }

    }
}