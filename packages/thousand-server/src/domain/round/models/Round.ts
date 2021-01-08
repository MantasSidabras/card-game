import { ID } from '@thousand/common/src/types';
import Card from '../../card/models/Card';
import { ThousandRank } from '../../card/models/Card.types';

class Round {
  private readonly _id: ID;
  private readonly _playedCards: Card<ThousandRank>[];

  constructor(id: ID) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  playCard(card: Card<ThousandRank>) {
    this._playedCards.push(card);
  }
}

export default Round;
