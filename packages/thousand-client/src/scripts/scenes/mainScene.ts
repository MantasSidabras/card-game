import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import store from '@thousand/common/dist/redux-store/store';
import { socket } from '../../websocket/websocket.util';
import CreateGameButton from '../objects/gameMenu/createGameButton';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import { updateTile } from '@thousand/common/dist/commands/board/board.command';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  createGameButton: Phaser.GameObjects.Text;
  rects: Phaser.GameObjects.Rectangle[];

  constructor() {
    super({ key: ScenePicker.main });
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0);
    const state = store.getState();
    const grid = state.game.grid;
    const sign = state.player.level === 1 ? 'X' : '0';
    this.rects = [
      this.add.rectangle(50, 50, 100, 100),
      this.add.rectangle(200, 50, 100, 100),
      this.add.rectangle(350, 50, 100, 100),

      this.add.rectangle(50, 200, 100, 100),
      this.add.rectangle(200, 200, 100, 100),
      this.add.rectangle(350, 200, 100, 100),

      this.add.rectangle(50, 350, 100, 100),
      this.add.rectangle(200, 350, 100, 100),
      this.add.rectangle(350, 350, 100, 100),
    ];

    this.rects.forEach((rect, index) => {
      rect.setInteractive();
      rect.setFillStyle(grid[index] === '' ? 0x111111 : grid[index] === 'X' ? 0x00ff00 : 0x0000ff);
      rect.on('pointerdown', () => {
        socket.send(JSON.stringify(updateTile({ index, value: sign })));
      });
    });

    this.fpsText = new FpsText(this);

    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24',
      })
      .setOrigin(1, 0);
  }

  update() {
    this.fpsText.update();
    this.rects.forEach((rect, index) => {
      const grid = store.getState().game.grid;
      rect.setFillStyle(grid[index] === '' ? 0x111111 : grid[index] === 'X' ? 0x00ff00 : 0x0000ff);
    });
  }
}
