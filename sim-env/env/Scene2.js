

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    // add the background in the center of the scene
    // this.background = this.add.image(0, 0, "background");
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");

    // sets the position of the background - good for pivot rotation, corner left size
    this.background.setOrigin(0,0);
    
  //   // Put 3 ships on the canvas - old declaration using image
  //   this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, "ship");
  //   this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2").setScale(3);;
  //   this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3").setScale(3);;
  //   this.ship2.y -= 100;
  // }

  // new declaration using sprite
  this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");
  
     // 0.2 create animations
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    // 0.3 play the animations
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    // 1 make the ships clickable to destroy them
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // 1.2
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;
  }

// accepts 2 params, one for ship object to move and another for velocity Y
//  call the resetShipPos from insid when the y position exceeds game height 
    moveShip(ship, speed){
        ship.y += speed;
        if (ship.y > config.height){
          this.resetShipPos(ship);
        }
    }

    // accepts the ship as an obj parameter and sets its Y position to zero
    // creates a random value between zero and th width of our game and assign it to the ship X value position
    resetShipPos(ship){
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, config.width);
      ship.x = randomX;
    }

     // 1.3
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  
  }
}