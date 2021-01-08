import { changeScene } from '@thousand/common/dist/redux-store/scene/scene.slice';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import store from '@thousand/common/dist/redux-store/store';
import commandDispatcher from '../../websocket/command-dispatcher';
import MenuButton from '../objects/gameMenu/menuButton';
import { createGame } from '@thousand/common/dist/commands/game/game.command';

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

    const joinGame = this.add.existing(
      new MenuButton(this, {
        x: centerW,
        y: 350,
        text: 'Join game',
        onClick: () => {
          console.log('hello there sir!');
        },
      })
    );
  }
}
