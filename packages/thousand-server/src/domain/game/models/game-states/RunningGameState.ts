import Game from '../Game';
import { GameState } from './GameState';
import { OverGameState } from './OverGameState';

export class RunningGameState implements GameState {
  private readonly _game: Game;
  constructor(game: Game) {
    this._game = game;
  }

  get value() {
    return 'RUNNING';
  }

  start() {
    return new RunningGameState(this._game);
  }

  end() {
    return new OverGameState(this._game);
  }

  nextTurn() {
    const currentIdx = this._game.players.findIndex(
      p => p.id === this._game.playerTurn.id
    );
    let newIndex = currentIdx + 1;
    if (newIndex >= this._game.players.length) {
      newIndex = 0;
    }
    this._game.playerTurn = this._game.players[newIndex];
    return this;
  }

  addPlayer() {
    console.log('PLAYERS CANNOT JOIN RUNNING GAME');

    return this;
  }
}
