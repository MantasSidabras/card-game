import { ID } from '@thousand/common/src/types';
import { uuid } from '../../../utils/uuid';
import Game from './Game';

class GameManager {
  private readonly _games: Map<ID, Game>;

  constructor() {
    this._games = new Map();
  }

  get games() {
    return this._games;
  }

  createNewGame() {
    const gameId = uuid();
    const game = new Game(gameId);
    this._games.set(gameId, game);
    return game;
  }

  getGameById(gameId: ID) {
    return this._games.get(gameId);
  }

  getGameByCode(gameCode: string) {
    for (const game of this._games.values()) {
      if (game.code === gameCode.toUpperCase()) {
        return game;
      }
    }
    return null;
  }
}

const gameManager = new GameManager();
export default gameManager;
