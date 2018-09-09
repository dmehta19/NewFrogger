

export class CarLine{
    constructor(_line, _amount,_speed,_name){
        //int: The id of row that this car line stand in
        this.line = _line;
        //int: How many cars in this car line
        this.amount = _amount;
        //float: The speed of the car line
        this.speed = _speed;
        //string: The texture key of car in this car line
        this.name = _name;
        // int: Set positive direction as right, if the line id is even, go right, else go left
        this.dir = (line%2==0)?1:-1;

        // array: the array to store the X position of all car in this line
        this.positions = [];

        for (var i = 0; i<this.amount; i++){
            this.positions.push(i);
        }

    }

    drawCar(){

    }
}