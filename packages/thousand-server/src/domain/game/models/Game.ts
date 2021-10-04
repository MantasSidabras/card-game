import { ID } from '@thousand/common/src/types';
import { NoPlayer } from '../../player/models/NoPlayer';
import Player from '../../player/models/Player';
import { PlayerType } from '../../player/models/Player.types';
import { generateCodeFromId } from './codeGenerator';
import { GameState } from './game-states/GameState';
import { GameType } from './Game.types';

class Game implements GameType {
  private readonly _id: ID;
  private readonly _code: string;
  private _players: readonly Player[];
  private _state: GameState;
  private _playerTurn: PlayerType;

  constructor(id: ID) {
    this._players = [];
    this._id = id;
    this._playerTurn = new NoPlayer();
    this._code = generateCodeFromId(id);
  }

  get id() {
    return this._id;
  }
  get code() {
    return this._code;
  }

  get playerIds(): ID[] {
    return this.players.map(x => x.id);
  }

  get players() {
    return this._players;
  }

  set playerTurn(player: PlayerType) {
    this._playerTurn = player;
  }

  get playerTurn() {
    return this._playerTurn;
  }

  nextTurn() {
    this._state.nextTurn();
  }

  addPlayer(player: Player) {
    this._state.addPlayer(player);
  }

  setPlayers(players: Player[]) {
    this._players = players;
  }

  start() {
    this._state = this._state.start();
  }
}

export default Game;
