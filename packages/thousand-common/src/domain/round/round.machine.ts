import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';

type RoundEvents = { type: 'REMOVE_PLAYER'; playerId: ID } | { type: 'NEXT_TURN' } | { type: 'FINISH' };

type RoundContext = {
  players: ID[];
  playerTurn: ID;
};

const getNext =
  <T>(array: T[]) =>
  (current: T) => {
    const idx = array.findIndex(p => p === current);
    return array[idx + 1 < array.length ? idx + 1 : 0];
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
      data: {
        winner: ({ playerTurn }: RoundContext) => playerTurn,
      },
    },
  },
});
