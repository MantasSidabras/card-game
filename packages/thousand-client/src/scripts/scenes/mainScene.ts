import FpsText from '../objects/fpsText';
import store from '@thousand/common/dist/redux-store/store';
import ScenePicker from '@thousand/common/dist/redux-store/scene/ScenePicker';
import Deck from '../objects/deck/deck';
import CardHolder from '../objects/card-holder/cardHolder';
import Card from '../objects/card/card';
import { CARD_SCALE } from '../../consts';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  holders: CardHolder[];
  deck: Deck;

  constructor() {
    super({ key: ScenePicker.main });
  }

  create() {
    const state = store.getState();

    this.deck = new Deck(this);
    this.add.rectangle(50, 50, 100, 100);

    this.fpsText = new FpsText(this);
    // const rect = this.add.graphics().strokeRect(100, 100, 200, 200);
    const zones = [
      [600, 600],
      [710, 600],
      [820, 600],
      [930, 600],
    ].map(([x, y]) => this.add.existing(new CardHolder(this, { x, y })));

    // const dropZone2 = this.add.zone(600, 150, w, h).setRectangleDropZone(w, h);
    // const rect2 = this.add
    // .rectangle(dropZone2.x, dropZone2.y, dropZone2.width, dropZone2.height, 0xff0000)
    // .setOrigin(0.5);
    this.deck.cards.forEach(card => {
      this.input.setDraggable(card);
    });

    this.input.on('drag', (pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      this.children.bringToTop(gameObject);
    });

    const restore = (card: Card) => {
      this.add.tween({
        targets: card,
        x: card.input.dragStartX,
        y: card.input.dragStartY,
        duration: 250,
      });
    };
    this.input.on('drop', (_pointer, card: Card, zone: CardHolder) => {
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      const offset = 0; //Math.floor(Math.random() * Math.floor(30)) * plusOrMinus;
      console.log({ zone });
      if (!zone.card) {
        card.occupy(zone);
        this.add.tween({
          targets: card,
          x: zone.x,
          y: zone.y,
          duration: 100,
        });
      } else {
        restore(card);
      }
      // card.x = zone.x + offset;
      // card.y = zone.y + offset;
    });
    this.input.on('dragend', (_pointer, card: Card, dropped: boolean) => {
      if (!dropped) {
        restore(card);
        // gameObject.x = gameObject.input.dragStartX;
        // gameObject.y = gameObject.input.dragStartY;
      }

      // graphics.clear();
      // graphics.lineStyle(2, 0xffff00);
      // graphics.strokeRect(
      //   zone.x - zone.input.hitArea.width / 2,
      //   zone.y - zone.input.hitArea.height / 2,
      //   zone.input.hitArea.width,
      //   zone.input.hitArea.height
      // );
    });
    // this.input.on('dragend', (pointer, gameObject: Phaser.GameObjects.Sprite) => {});
  }

  update() {
    this.fpsText.update();
    this.deck.cards.forEach(card => {
      (card.body as any).debugBodyColor = (card.body as any).touching.none ? 0x0099ff : 0xff9900;
    });
  }
}
