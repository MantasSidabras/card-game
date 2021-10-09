import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';
import { roundMachine } from '../round/round.machine';

export type PlayerContext = {
  id: ID;
  name?: string;
  score: number;
};

type PlayerEvents = any;

type CreatePlayerType = (player: { id: PlayerContext['id']; name: PlayerContext['name'] }) => PlayerContext;
export const createPlayer: CreatePlayerType = ({ id, name }) => ({
  id,
  name,
  score: 0,
});

const playerMachine = createMachine<PlayerContext, PlayerEvents>({});
