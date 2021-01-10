import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import store from '@thousand/common/dist/redux-store/store';
import MenuButton from '../objects/gameMenu/menuButton';
import { codeSelector } from '@thousand/common/dist/redux-store/game/game.selector';
import { GameObjects } from 'phaser';
import { leaveGame } from '@thousand/common/dist/commands/game/game.command';
import commandDispatcher from '../../websocket/command-dispatcher';

export default class LobbyScene extends Phaser.Scene {
  private code: GameObjects.Text;

  constructor() {
    super({ key: ScenePicker.lobby });
  }

  create() {
    this.add.existing(
      new MenuButton(this, {
        x: 500,
        y: 500,
        text: 'Back',
        onClick: () => commandDispatcher.send(leaveGame()),
      })
    );
    this.code = this.add
      .text(this.cameras.main.width / 2, 200, '', {
        color: '#000000',
        fontSize: '64px',
      })
      .setOrigin(1, 0);
    store.subscribe(() => {});
    this.add
      .text(this.cameras.main.width - 200, 50, 'players:', {
        color: '#000000',
        fontSize: '48px',
      })
      .setOrigin(1, 0);
  }

  update() {
    const code = codeSelector(store.getState());
    console.log(code);
    this.code.setText(code);
    // const code = codeSelector(store.getState());
    // if (code !== this.code.text) {
    //   this.code.setText(code);
    // }
  }
}
