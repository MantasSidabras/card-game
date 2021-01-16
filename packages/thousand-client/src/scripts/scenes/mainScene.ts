import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import store from '@thousand/common/dist/redux-store/store';
import { socket } from '../../websocket/websocket.util';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import { updateTile } from '@thousand/common/dist/commands/board/board.command';
import Card from '../objects/card/card';
import { CardSuite, CardValue } from '../objects/card/card.types';
import Deck from '../objects/deck/deck';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  createGameButton: Phaser.GameObjects.Text;

  constructor() {
    super({ key: ScenePicker.main });
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0);
    const state = store.getState();
    const grid = state.game.grid;
    const sign = state.player.level === 1 ? 'X' : '0';

    const deck = new Deck(this);
    this.add.rectangle(50, 50, 100, 100);
    // this.add.existing(new Card(this, { sprite: 'card_spades_Q', x: 500, y: 500, value: 9, suite: CardSuite.SPADES }));
    // this.add.existing(new Card(this, { sprite: 'card_spades_K', x: 500, y: 500, value: 9, suite: CardSuite.SPADES }));
    // this.add.existing(new Card(this, { sprite: 'card_spades_A', x: 500, y: 500, value: 9, suite: CardSuite.SPADES }));

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
  }
}
