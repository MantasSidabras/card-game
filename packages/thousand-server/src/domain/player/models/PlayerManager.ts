import { ID } from '@thousand/common/src/types';
import Player from './Player';

export class PlayerManager {
  private _players = new Map<ID, Player>();

  static init() {
    return new PlayerManager();
  }

  create(playerId: ID): Player {
    const player = new Player(playerId);
    this._players.set(playerId, player);
    return player;
  }

  get(playerId: ID): Player | undefined {
    return this._players.get(playerId);
  }

  remove(playerId: ID): boolean {
    return this._players.delete(playerId);
  }

  get size(): number {
    return this._players.size;
  }

  get ids(): ID[] {
    return Array.from(this._players.values()).map(({ id }) => id);
  }

  get list(): Player[] {
    return Array.from(this._players.values());
  }
}

export const playerManager = new PlayerManager();
