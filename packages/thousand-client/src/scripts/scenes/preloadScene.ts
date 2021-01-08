import { changeScene } from '@thousand/common/dist/redux-store/scene/scene.slice';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import store from '@thousand/common/dist/redux-store/store';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: ScenePicker.preload });
  }

  preload() {
    for (let i = 0; i <= 5; i++) {
      this.load.image(`btn-${i}`, `assets/Ui/blue_button0${i}.png`);
      this.load.image(`btn-${i}-disabled`, `assets/Ui/grey_button0${i}.png`);
    }
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
  }

  create() {
    // this.scene.start(ScenePicker.menu);
    store.dispatch(changeScene(ScenePicker.menu));
    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
