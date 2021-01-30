import { Scene } from 'phaser';
import { CARD_SCALE } from '../../../consts';
import CardHolder from '../card-holder/cardHolder';
import { CardSuite, CardValue } from './card.types';

interface CardArgs {
  x: number;
  y: number;
  sprite: string;
  suite: CardSuite;
  value: CardValue;
  isVisible?: boolean;
}

export default class Card extends Phaser.GameObjects.Sprite {
  private _occupiedHolder: CardHolder | null;
  private _scene: Scene;
  private _isVisible: boolean;
  private _value: number;

  constructor(scene: Phaser.Scene, { sprite, x, y, value, isVisible = true }: CardArgs) {
    super(scene, x, y, sprite);
    scene.input.mouse.disableContextMenu();
    this._isVisible = Boolean(isVisible);
    if (!isVisible) {
      this.setTexture('card_back');
    }
    this._value = value;
    this._scene = scene;
    this.setScale(CARD_SCALE);
    this.setInteractive();

    scene.physics.add.existing(this);
    // scene.input.enableDebug(this);

    this.on('pointerdown', pointer => this.onClick(pointer, sprite));

    this.on('pointerover', this.onHover);
    this.on('pointerout', this.onBlur);
  }

  private onClick = (pointer: any, sprite: string) => {
    if (pointer.rightButtonDown()) {
      if (this._isVisible) {
        this.setTexture('card_back');
      } else {
        this.setTexture(sprite);
      }
      this.toggleIsVisible();
    }
  };

  private onHover = () => {
    this._scene.add.tween({
      targets: this,
      scale: 2.3,
      duration: 150,
    });
  };

  private onBlur = () => {
    this._scene.add.tween({
      targets: this,
      scale: 2,
      duration: 150,
    });
  };

  get isVisible() {
    return this._isVisible;
  }

  get value() {
    return this._value;
  }

  private toggleIsVisible() {
    this._isVisible = !this._isVisible;
  }

  public occupy(holder: CardHolder) {
    if (this._occupiedHolder) {
      this._occupiedHolder.free();
    }

    holder.occupy(this);
    this._occupiedHolder = holder;
  }

  get occupiedHolder() {
    return this._occupiedHolder;
  }
}
