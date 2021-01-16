interface ButtonArgs {
  x: number;
  y: number;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}

enum ButtonKey {
  default = 'btn-4',
  clicked = 'btn-3',
  hovered = 'btn-2',
}

export default class MenuButton extends Phaser.GameObjects.Container {
  private button: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.Sprite;
  private _disabled: boolean;

  constructor(scene: Phaser.Scene, { x, y, text, onClick, onHover, disabled }: ButtonArgs) {
    const btn = scene.add.image(0, 0, ButtonKey.default).setOrigin(0.5).setScale(2);
    // btn.play('btn');
    const txt = scene.add
      .text(0, 0, text)
      .setStyle({
        fontSize: '36px',
      })
      .setOrigin(0.5);
    super(scene, x, y, [btn, txt]);

    this._disabled = Boolean(disabled);
    this.button = btn;
    this.setSize(btn.width * 2, btn.height * 2);
    this.setInteractive({ useHandCursor: true });
    this.on('pointerover', () => this.onHover(onHover));
    this.on('pointerout', this.onBlur);
    this.on('pointerdown', () => this.onClick(onClick));
    this.on('pointerup', this.onClickUp);
  }

  private onHover(callback?: ButtonArgs['onHover']) {
    // this.button.setTint(0x44ff44);
    this.button.setTexture(ButtonKey.hovered);
    if (callback) {
      callback();
    }
  }
  private onBlur() {
    this.button.setTexture(ButtonKey.default);
    this.button.clearTint();
  }

  onClick(callback?: ButtonArgs['onClick']) {
    this.button.setTexture(ButtonKey.clicked);
    this.setY(this.y + 5);
    if (callback) {
      callback();
    }
  }

  onClickUp() {
    this.button.setTexture(ButtonKey.default);
    this.setY(this.y - 5);
  }
}
