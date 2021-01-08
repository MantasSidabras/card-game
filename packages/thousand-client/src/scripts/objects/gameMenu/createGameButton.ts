export default class CreateGameButton extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, '', { color: 'black', fontSize: '50px' });
    scene.add.existing(this);

    const txt = scene.add
      .text(scene.cameras.main.width - 100, 100, 'CREATE GAME', {
        color: '#000000',
        fontSize: '50px',
      })
      .setOrigin(1, 0)
      .setInteractive()
      .on('pointerover', () => {
        txt.setStyle({
          color: '#00ff00',
        });
      })
      .on('pointerout', () => {
        txt.setStyle({
          color: '#000000',
        });
      });
  }

  update() {}
}
