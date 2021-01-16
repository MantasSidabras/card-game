import { Scene } from 'phaser';
import { getCardSprites } from '../../sprites/cardSprites';
import Card from '../card/card';
import { CardSuite } from '../card/card.types';
import { mapCardToThousandValue, mapToSuite } from '../card/card.utils';

class Deck {
  _cards: Card[];
  constructor(scene: Scene) {
    const cards = getCardSprites().map((sprite, index) => {
      const [_, suite, value] = sprite.split('_');

      const card = new Card(scene, {
        sprite,
        value: mapCardToThousandValue[value],
        suite: mapToSuite[suite],
        x: 400 + index,
        y: 400 + index,
      });
      scene.add.existing(card);
      return card;
    });
    this._cards = cards;
  }
}

export default Deck;
