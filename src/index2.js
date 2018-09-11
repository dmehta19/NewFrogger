import 'phaser';
import {level1} from "./level1";
import {CarLine} from "./CarLine";

var config = {

    parent: 'NewFrogger',
    width: 480,
    height: 480,
    pixelart: true,
    zoom: 5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }


};

var drag =2,velocity=2 ;
var game = new Phaser.Game(config);
var player;
var cursors;
var car;

function preload()
{
    this.load.image('frogger_tiles', '/assets/Environment/Frogger_TileMap.png');
    this.load.image('Car','/assets/Imgs/Cars/Car_sprite_01.png');
    //this.load.image('frogger_tiles', '/assets/Environment/Frogger_Map.png');
    this.load.image('frog', '/assets/Character/Frog/Frog_sprite_01.png');
}

function create()
{
    const level1 =
        [
            [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        ];

    const map = this.make.tilemap({
        data: level1,
        tileWidth: 32,
        tileHeight: 32
    });
    const tiles = map.addTilesetImage('frogger_tiles');
    const layer = map.createStaticLayer(0, tiles, 0, 0);

    cursors = this.input.keyboard.createCursorKeys();

   // player.setBounce(0.2);

    //this.add.image(0,0,'frogger_tiles').setOrigin(0,0);
    car = this.physics.add.sprite(20,450 ,'Car');

    car.setVelocityX(20);
   car.setCollideWorldBounds(true);
    player = this.physics.add.sprite(100, 450, 'frog');//.setScale(2);
    player.setCollideWorldBounds(true);
    this.physics.add.overlap(player, car,DestroyFrog,null,this);
}
function update()
{

    if (cursors.left.isDown)
    {
        player.x -= velocity; //-=100//-= 10;


    }
    else if (cursors.right.isDown)
    {
        player.x += velocity; // += 10;


    }
    else if(cursors.down.isDown)
    {
        player.y += velocity; // += 100;


    }

   else if (cursors.up.isDown )
    {
        player.y -= velocity;  //-= 10;
    }
    //player.setVelocity(0,0);
}
function DestroyFrog(){
    console.log("Player dead");
}