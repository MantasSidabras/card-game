import { Scene } from 'phaser';
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
  private _scene: Scene;
  private _isVisible: boolean;
  private _value: number;

  constructor(scene: Phaser.Scene, { sprite, x, y, value, isVisible }: CardArgs) {
    super(scene, x, y, sprite);
    scene.input.mouse.disableContextMenu();
    this._isVisible = Boolean(isVisible);
    if (!isVisible) {
      this.setTexture('card_back');
    }
    this._value = value;
    this.scene = scene;
    this.setScale(2);
    this.setInteractive();
    scene.input.setDraggable(this);

    scene.input.on('drag', (pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      scene.children.bringToTop(gameObject);
    });

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
    this.scene.add.tween({
      targets: this,
      scale: 2.5,
      duration: 150,
    });
  };

  private onBlur = () => {
    this.scene.add.tween({
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
}
