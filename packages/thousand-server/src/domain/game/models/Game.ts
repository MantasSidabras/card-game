import { ID } from '@thousand/common/src/types';
import { uuid } from '../../../utils/uuid';
import Board from '../../board/models/Board';
import Player from '../../player/models/Player';
import { generateCodeFromId } from './codeGenerator';

class Game {
  private readonly _id: ID;
  private readonly _code: string;
  private readonly _board: Board;
  private readonly _players: Player[];
  private _playerTurn: ID;
  private _isRunning = false;

  constructor(id: ID) {
    this._players = [];
    this._id = id;
    this._code = generateCodeFromId(id);
    this._board = new Board();
  }

  get id() {
    return this._id;
  }

  get code() {
    return this._code;
  }

  get board() {
    return this._board;
  }
  get players() {
    return this._players;
  }

  get haveEnoughPlayers() {
    return this._players.length > 1;
  }

  get playerIds(): ID[] {
    return this._players.map(({ id }) => id);
  }

  get playerTurn() {
    return this._playerTurn;
  }

  get isRunning() {
    return this._isRunning;
  }

  nextTurn() {
    const currentIdx = this._players.findIndex(p => p.id === this._playerTurn);
    let newIndex = currentIdx + 1;
    if (newIndex >= this._players.length) {
      newIndex = 0;
    }
    this._playerTurn = this._players[newIndex].id;
  }

  addPlayer(player: Player) {
    this._players.push(player);
  }

  removePlayer(playerId: ID): Player {
    const index = this._players.findIndex(p => p.id === playerId);
    const player = this._players[index];
    this._players.splice(index, 1);
    return player;
  }

  start() {
    console.log('players len: ', this._players.length);

    if (this._players.length > 1) {
      this._isRunning = true;
      this._playerTurn = this._players[0].id;
    } else {
      throw new Error('not enough players to start the game');
    }
  }
}

export default Game;
export const game = new Game(uuid());
