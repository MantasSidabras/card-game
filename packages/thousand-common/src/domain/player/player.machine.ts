import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';
import { roundMachine } from '../round/round.machine';

export type PlayerContext = {
  id: ID;
  name?: string;
  score: number;
};

type PlayerEvents =
  | { type: 'START' }
  | { type: 'ADD_PLAYER'; playerId: ID }
  | { type: 'REMOVE_PLAYER'; playerId: ID }
  | { type: 'NEXT_TURN' }
  | { type: 'END_ROUND' };

type GameContext = {
  id: ID;
  code: string;
  players: ID[];
  winner: ID | null;
};

type CreatePlayerType = (player: { id: PlayerContext['id']; name: PlayerContext['name'] }) => PlayerContext;
export const createPlayer: CreatePlayerType = ({ id, name }) => ({
  id,
  name,
  score: 0,
});
