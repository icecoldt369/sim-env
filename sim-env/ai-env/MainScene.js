export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload(){
        console.log("preload");
        this.load.atlas('villager', 'assets/images/villager.png', 'assets/images/villager_atlas.json');
    }

    create(){
        console.log("create");
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world, 0, 0, 'villager', 'playerdown');
        this.add.existing(this.player);
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        console.log("update");
        const speed = 2.5;
        // create 2 dimensional vectors for speed
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1; // left
        }else if (this.inputKeys.right.isDown){
            playerVelocity.x = 1 // right
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1; // up
        }else if (this.inputKeys.down.isDown){
            playerVelocity.y = 1 // down
        }
        // restrict magnitude of vector to 1 (inc diagonal travel)
        playerVelocity.normalize();
        playerVelocity.scale(speed); //multiply unit vector by the speed
        this.player.setVelocity(playerVelocity.x, playerVelocity.y); // use x, y
    }
}
