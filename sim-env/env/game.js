window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        // edit the size of the bg canvas
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        scene: [Scene1, Scene2]
    };

    //  init () preps the data 

    var game = new Phaser.Game(config);

    function preload() {
        // Preload assets here, like images, audio, etc into memory
    }

    function create() {
        // Create game objects and initialize the scene here.
        // add game sprites / obs !! wooo!
        var sprite = this.add.sprite(400, 300, 'your_sprite_key');
    }

    function update() {
        // Update the scene. This function is called repeatedly in the game loop + runs constantly
    }
}
