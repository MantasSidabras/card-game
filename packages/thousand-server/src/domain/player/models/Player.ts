import { ID } from '@thousand/common/src/types';
import Game from '../../game/models/Game';

class Player {
  private readonly _id: ID;
  private _activeGame: Game | null;

  constructor(id: ID) {
    this._id = id;
    this._activeGame = null;
  }

  get id() {
    return this._id;
  }

  get activeGame() {
    return this._activeGame;
  }

  joinGame(game: Game) {
    this._activeGame = game;
  }

  leaveGame() {
    this._activeGame = null;
  }
}

export default Player;

const players = new Map<ID, Player>();
