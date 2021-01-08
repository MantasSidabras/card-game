import Card from '../../card/models/Card';
import { Suite, ThousandRank, ThousandRankValue } from '../../card/models/Card.types';

class ThousandDeck {
  private _cards: Card<ThousandRank>[];

  constructor() {
    // initialize deck with all necessary cards suites x ranks
    const cards = Object.keys(Suite).flatMap(suiteKey => {
      const suite = Suite[suiteKey as keyof typeof Suite];
      return Object.keys(ThousandRank).map(rankKey => {
        const rank = ThousandRank[rankKey as keyof typeof ThousandRank];
        const card = new Card(suite, rank, ThousandRankValue[rank]);
        return card;
      });
    });

    this._cards = cards;
    this.shuffle();
  }

  count() {
    return this._cards.length;
  }

  totalValue() {
    return this._cards.reduce((acc, card) => acc + card.value, 0);
  }

  shuffle() {
    const original_order = this._cards;
    let new_order = [];
    while (original_order.length) {
      const index = Math.random() * original_order.length;
      const removed = original_order.splice(index, 1)[0];
      new_order.push(removed);
    }
    this._cards = new_order;
  }

  draw() {
    return this._cards.pop();
  }
}

export default ThousandDeck;
