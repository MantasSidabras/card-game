import { ID } from '../../types';
import { PlayerContext } from '../player/player.machine';

export type AddPlayerEvent = { type: 'ADD_PLAYER'; playerId: ID; name?: string };
export type RemovePlayerEvent = { type: 'REMOVE_PLAYER'; playerId: ID };

export type GameEvents =
  | { type: 'START' }
  | AddPlayerEvent
  | RemovePlayerEvent
  | { type: 'NEXT_TURN' }
  | { type: 'END_ROUND' };

export type GameContext = {
  id: ID;
  code: string;
  players: PlayerContext[];
  winner: ID | null;
};

export type GuardType<C, E> = (context: C, event: E) => boolean;
export type GameGuardType = GuardType<GameContext, GameEvents>;
