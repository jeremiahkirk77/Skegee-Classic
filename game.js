const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player, cursors;

function preload() {
    // Load player and tiles images from assets folder
    this.load.image('tiles', 'assets/tiles.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
    // Room background
    this.add.image(160, 160, 'tiles');

    // Player in center
    player = this.physics.add.sprite(160, 160, 'player');
    player.setCollideWorldBounds(true);

    // Walk animations (2 frames per direction)
    this.anims.create({ key: 'walk-down', frames: this.anims.generateFrameNumbers('player', { start:0, end:1 }), frameRate:8, repeat:-1 });
    this.anims.create({ key: 'walk-up', frames: this.anims.generateFrameNumbers('player', { start:2, end:3 }), frameRate:8, repeat:-1 });
    this.anims.create({ key: 'walk-left', frames: this.anims.generateFrameNumbers('player', { start:4, end:5 }), frameRate:8, repeat:-1 });
    this.anims.create({ key: 'walk-right', frames: this.anims.generateFrameNumbers('player', { start:6, end:7 }), frameRate:8, repeat:-1 });

    // Arrow keys
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    const speed = 100;
    player.setVelocity(0);

    if(cursors.left.isDown){ player.setVelocityX(-speed); player.anims.play('walk-left', true); }
    else if(cursors.right.isDown){ player.setVelocityX(speed); player.anims.play('walk-right', true); }
    else if(cursors.up.isDown){ player.setVelocityY(-speed); player.anims.play('walk-up', true); }
    else if(cursors.down.isDown){ player.setVelocityY(speed); player.anims.play('walk-down', true); }
    else{ player.anims.stop(); }
}
