import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import store from '@thousand/common/dist/redux-store/store';
import MenuButton from '../objects/gameMenu/menuButton';
import { codeSelector, playersSelector } from '@thousand/common/dist/redux-store/game/game.selector';
import { playerIdSelector } from '../../../../thousand-common/dist/redux-store/player/player.selector';
import { GameObjects } from 'phaser';
import { leaveGame, startGame } from '@thousand/common/dist/commands/game/game.command';
import commandDispatcher from '../../websocket/command-dispatcher';

export default class LobbyScene extends Phaser.Scene {
  private code: GameObjects.Text;
  private startButton: GameObjects.Container;
  private players: GameObjects.Text[];

  constructor() {
    super({ key: ScenePicker.lobby });
  }

  create() {
    const centerW = this.cameras.main.width / 2;
    const centerH = this.cameras.main.height / 2;
    this.add.existing(
      new MenuButton(this, {
        x: centerW,
        y: 500,
        text: 'Back',
        onClick: () => commandDispatcher.send(leaveGame()),
      })
    );
    this.code = this.add
      .text(centerW, 200, '', {
        color: '#000000',
        fontSize: '64px',
      })
      .setOrigin(0.5);
    store.subscribe(() => {});
    this.add
      .text(this.cameras.main.width - 300, 50, 'players:', {
        color: '#000000',
        fontSize: '48px',
      })
      .setOrigin(0.5);

    this.players = [0, 1, 2, 3].map(index => {
      return this.add
        .text(this.cameras.main.width - 300, 100 + index * 50, '', {
          color: '#000000',
          fontSize: '24px',
        })
        .setOrigin(0.5);
    });

    this.startButton = this.add
      .existing(
        new MenuButton(this, {
          x: centerW,
          y: centerH,
          text: 'Start',
          onClick: () => {
            commandDispatcher.send(startGame());
          },
        })
      )
      .setVisible(false);
  }

  setPlayers() {
    const ps = playersSelector(store.getState());
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].setText(ps[i] ?? '');
    }
  }

  update() {
    const code = codeSelector(store.getState());
    const myId = playerIdSelector(store.getState());
    if (myId === this.players[0].text) {
      this.startButton.setVisible(true);
    } else {
      this.startButton.setVisible(false);
    }
    this.code.setText(`Code: ${code}`);

    this.setPlayers();
  }
}
