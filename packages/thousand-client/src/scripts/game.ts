import store from '../../../thousand-common/dist/redux-store/store';
import 'phaser';
import { socket } from '../websocket/websocket.util';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import LobbyScene from './scenes/lobbyScene';
import MenuScene from './scenes/menuScene';
import { activeSceneSelector } from '@thousand/common/dist/redux-store/scene/scene.selector';
import { AnyAction } from '@reduxjs/toolkit';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ddd',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MenuScene, LobbyScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 },
    },
  },
  dom: {
    createContainer: true,
  },
  render: {
    pixelArt: true,
  },
};
let activeScene = activeSceneSelector(store.getState());

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ type: 'HELLO', payload: 12345 }));
});
socket.addEventListener('message', ({ data }) => {
  const action: AnyAction = JSON.parse(data);
  store.dispatch(action);
});

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
  store.subscribe(() => {
    const storeActiveScene = activeSceneSelector(store.getState());
    if (storeActiveScene !== activeScene) {
      const scene = game.scene.getScene(activeScene);
      scene.scene.start(storeActiveScene);
      activeScene = storeActiveScene;
    }
  });
});
