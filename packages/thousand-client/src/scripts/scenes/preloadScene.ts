import { changeScene } from '@thousand/common/dist/redux-store/scene/scene.slice';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import store from '@thousand/common/dist/redux-store/store';
import { getCardSprites } from '../sprites/cardSprites';
const cardSuites = ['clubs', 'diamonds', 'hearts', 'spades'];
const cardValues = ['09', '10', 'J', 'Q', 'K', 'A'];
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: ScenePicker.preload });
  }

  preload() {
    this.load.html('code-form', 'assets/dom/code-form.html');
    for (let i = 0; i <= 5; i++) {
      this.load.image(`btn-${i}`, `assets/Ui/blue_button0${i}.png`);
      this.load.image(`btn-${i}-disabled`, `assets/Ui/grey_button0${i}.png`);
    }
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');

    // cardSuites.forEach(suite => {
    //   cardValues.forEach(value => {
    //     this.load.image(`card-${suite}-${value}`, `assets/Cards/card_${suite}_${value}.png`);
    //   });
    // });
    getCardSprites().forEach(sprite => {
      this.load.image(sprite, `assets/Cards/${sprite}.png`);
    });

    this.load.image('card_back', 'assets/Cards/card_back.png');
    this.load.image('card_empty', 'assets/Cards/card_empty.png');
  }

  create() {
    // this.scene.start(ScenePicker.menu);
    store.dispatch(changeScene(ScenePicker.main));
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
