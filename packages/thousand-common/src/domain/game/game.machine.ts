import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';
import { roundMachine } from '../round/round.machine';

type GameEvents =
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

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

export const gameMachine = createMachine<GameContext, GameEvents>({
  id: 'game',
  initial: 'waiting',
  context: {
    id: '',
    code: '',
    players: [],
    winner: null,
  },
  states: {
    waiting: {
      on: {
        ADD_PLAYER: {
          cond: ({ players }, { playerId }) =>
            Boolean(playerId) && !players.find(p => p === playerId) && players.length < MAX_PLAYERS,
          actions: assign({
            players: ({ players }, { playerId }) => [...players, playerId],
          }),
        },
        REMOVE_PLAYER: {
          actions: assign({
            players: ({ players }, { playerId }) => players.filter(p => p !== playerId),
          }),
        },
      },
      always: {
        target: 'ready',
        cond: ({ players }) => players.length >= MIN_PLAYERS,
      },
      meta: {
        message: 'waiting for players to join!',
      },
    },
    ready: {
      on: {
        START: {
          target: 'running',
        },
        ADD_PLAYER: {
          cond: ({ players }, { playerId }) =>
            Boolean(playerId) && !players.find(p => p === playerId) && players.length < MAX_PLAYERS,
          actions: assign({
            players: ({ players }, { playerId }) => [...players, playerId],
          }),
        },
        REMOVE_PLAYER: {
          actions: assign({
            players: ({ players }, { playerId }) => players.filter(p => p !== playerId),
          }),
        },
      },
      always: {
        target: 'waiting',
        cond: ({ players }) => players.length < MIN_PLAYERS,
      },
      meta: {
        message: 'ready to start the game!',
      },
    },
    running: {
      always: {
        target: 'over',
        cond: ({ winner }) => Boolean(winner),
      },
      invoke: {
        id: 'round',
        src: roundMachine,
        data: ({ players }: GameContext) => ({
          players,
          playerTurn: players[0],
        }),
        onDone: {
          actions: assign({
            winner: (ctx, event) => event.data.winner,
          }),
        },
      },
    },
    over: {
      type: 'final',
    },
  },
});

// export const gameService = interpret(gameMachine).onTransition(state => console.log(state.value));
// gameService.start();
// gameService.send({ type: 'START' });
