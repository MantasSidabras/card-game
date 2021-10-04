import { ID } from '@thousand/common/src/types';
import { NoGame } from '../../game/models/game-states/NoGame';
import { GameType } from '../../game/models/Game.types';
import { PlayerType } from './Player.types';

class Player implements PlayerType {
  private readonly _id: ID;
  private _activeGame: GameType = new NoGame();

  constructor(id: ID) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get activeGame() {
    return this._activeGame;
  }
}

export default Player;
