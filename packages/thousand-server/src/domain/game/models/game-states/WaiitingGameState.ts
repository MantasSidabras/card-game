import Player from '../../../player/models/Player';
import Game from '../Game';
import { GameState } from './GameState';
import { RunningGameState } from './RunningGameState';

export class WaitingGameState implements GameState {
  private readonly _game: Game;

  constructor(game: Game) {
    this._game = game;
  }

  get value() {
    return 'WAITING';
  }

  start() {
    console.log('players len: ', this._game.players.length);

    if (this._game.players.length > 1) {
      this._game.playerTurn = this._game.players[0];
      return new RunningGameState(this._game);
    } else {
      return new WaitingGameState(this._game);
    }
  }

  end() {
    return new WaitingGameState(this._game);
  }

  nextTurn() {
    return new WaitingGameState(this._game);
  }

  addPlayer(player: Player) {
    this._game.setPlayers([...this._game.players, player]);
    return new WaitingGameState(this._game);
  }
}
