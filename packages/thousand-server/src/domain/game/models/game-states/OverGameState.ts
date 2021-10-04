import Player from '../../../player/models/Player';
import Game from '../Game';
import { GameState } from './GameState';

export class OverGameState implements GameState {
  private _game: Game;
  constructor(game: Game) {
    this._game = game;
  }

  get value() {
    return 'OVER';
  }

  start() {
    return this;
  }
  end() {
    return this;
  }
  nextTurn() {
    return this;
  }
  addPlayer() {
    return this;
  }
}
