import { Suite } from './Card.types';

class Card<Rank> {
  private _suite: Suite;
  private _rank: Rank;
  private _value: number;

  constructor(suite: Suite, rank: Rank, value: number) {
    this._suite = suite;
    this._rank = rank;
    this._value = value;
  }

  get suite() {
    return this._suite;
  }
  get rank() {
    return this._rank;
  }
  get value() {
    return this._value;
  }
}

export default Card;
