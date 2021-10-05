import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';
import { playersSelector } from '../../redux-store/game/game.selector';
import { PlayerContext } from '../player/player.machine';

type RoundEvents = { type: 'REMOVE_PLAYER'; playerId: ID } | { type: 'NEXT_TURN' } | { type: 'FINISH' };

type RoundContext = {
  players: PlayerContext[];
  playerTurn: ID;
};

const getNext =
  <T extends { id: ID }>(array: T[]) =>
  (current: ID) => {
    const idx = array.findIndex(p => p.id === current);
    return array[idx + 1 < array.length ? idx + 1 : 0].id;
  };

const incRandom = (arr: PlayerContext[]) => {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr.map((p, idx) => (idx === randIdx ? { ...p, score: p.score + 300 } : p));
};

export const roundMachine = createMachine<RoundContext, RoundEvents>({
  id: 'round',
  initial: 'active',
  states: {
    active: {
      on: {
        NEXT_TURN: {
          actions: assign({
            playerTurn: ({ players, playerTurn }) => getNext(players)(playerTurn),
          }),
        },
        FINISH: { target: 'finished' },
      },
    },
    finished: {
      type: 'final',
      entry: assign({
        players: ({ players }) => incRandom(players),
      }),
      data: {
        players: ({ players }: RoundContext) => players,
      },
    },
  },
});
