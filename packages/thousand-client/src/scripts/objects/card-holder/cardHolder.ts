import { Scene } from 'phaser';
import { CARD_HEIGHT, CARD_SCALE, CARD_WIDTH } from '../../../consts';
import Card from '../card/card';

interface CardHolderArgs {
  x: number;
  y: number;
}

class CardHolder extends Phaser.GameObjects.Zone {
  private _card: Card | null;
  private _graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Scene, { x, y }: CardHolderArgs) {
    const width = CARD_WIDTH * (CARD_SCALE + 0.2);
    const height = CARD_HEIGHT * (CARD_SCALE + 0.2);
    super(scene, x, y, width, height);
    this.name = 'card_holder';
    this.setRectangleDropZone(width, height);

    this._graphics = scene.add.graphics();
    this._graphics.lineStyle(5, 0xffff00);
    this._graphics.strokeRect(
      this.x - this.input.hitArea.width / 2,
      this.y - this.input.hitArea.height / 2,
      this.input.hitArea.width,
      this.input.hitArea.height
    );
  }

  get card() {
    return this._card;
  }

  occupy(card: Card) {
    this._card = card;
  }

  free() {
    this._card = null;
  }

  setCard(card: Card) {
    this._card = card;
  }
}

export default CardHolder;
