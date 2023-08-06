class Scene1 extends Phaser.Scene {
    constructor() {
        //  super() makes the class inherit all the characteristics of preds
        //  pass identifier as parameter for the scene
        super("bootGame");
    }
    preload(){
        this.load.image("background", "background.png");
        // this.load.image("ship", "ship.png");
        // this.load.image("ship2", "ship2.png");
        // this.load.image("ship3", "ship3.png");
        // this.load.image("colors", "colors.png");

        // spritesheet conversion defined with the size of th pixel frames
        
        this.load.spritesheet("ship", "spritesheets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2", "spritesheets/ship2.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3", "spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion", "spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });
    }

    // create text ob
    create() {
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
    }
}