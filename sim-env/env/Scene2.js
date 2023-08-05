class Scene2 extends Phaser.Scene {
    constructor() {
        //  super() makes the class inherit all the characteristics of preds
        //  pass identifier as parameter for the scene
        super("playGame");
    }
    
    create() {
        // x, y "key" (name of image defined)
        this.background = this.add.image(0,0, "background");
        // pivot top left - helpful for rotation pivot specification or position offst
        this.background.setOrigin(0,0); 
    

        this.add.text(20, 20, "Playing Game", {font: "25px Arial", fill: "green"});
    }
} 