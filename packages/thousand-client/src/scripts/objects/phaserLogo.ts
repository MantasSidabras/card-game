import store from '@thousand/common/dist/redux-store/store';
import { socket } from '../../websocket/websocket.util';

export default class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'phaser-logo');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        // socket.send(JSON.stringify(updateTile({ index: 1, value: 'X' })));
        this.setVelocityY(-400);
      });
  }
}
