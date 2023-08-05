class Scene1 extends Phaser.Scene {
    constructor() {
        //  super() makes the class inherit all the characteristics of preds
        //  pass identifier as parameter for the scene
        super("bootGame");
    }
    preload(){
        this.load.image("background", "background.png");
        this.load.image("ship", "ship.png");
        this.load.image("ship2", "ship2.png");
        this.load.image("ship3", "ship3.png");
        this.load.image("colors", "colors.png");
    }

    // create text ob
    create() {
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
    }
}