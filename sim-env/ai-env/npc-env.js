import MainScene from "./MainScene.js";

const config = {
    width:512,
    height: 512,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'npc-env',
    scene: [MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true, // see colliders
            gravity: {y:0}, // 2D env
        }
    },
};


// phaser instance
var game = new Phaser.Game(config);