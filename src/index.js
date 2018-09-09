import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'NewFrogger',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    ContentManager.preload();
}

function create ()
{
}

function update ()
{
}