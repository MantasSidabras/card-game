import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import commandDispatcher from '../../websocket/command-dispatcher';
import MenuButton from '../objects/gameMenu/menuButton';
import { createGame, joinGame } from '@thousand/common/dist/commands/game/game.command';

export default class MenuScene extends Phaser.Scene {
  btn: Phaser.GameObjects.Container;
  constructor() {
    super({ key: ScenePicker.menu });
  }

  preload() {}

  create() {
    const centerW = this.cameras.main.width / 2;
    const startGame = this.add.existing(
      new MenuButton(this, {
        x: centerW,
        y: 200,
        text: 'Create game',
        onClick: () => {
          console.log('hello there sir!');
          commandDispatcher.send(createGame());
        },
      })
    );
    const codeForm = this.add.dom(centerW - 400, 350).createFromCache('code-form').addListener('change');
    const joinGameButton = this.add.existing(
      new MenuButton(this, {
        x: centerW,
        y: 350,
        text: 'Join game',
        onClick: () => {
          const code = codeForm.getChildByName('code') as HTMLInputElement;
          commandDispatcher.send(joinGame(code.value));
        },
      })
    );


  }
}
