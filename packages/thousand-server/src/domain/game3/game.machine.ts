import { ID } from '@thousand/common/src/types';
import { assign, createMachine, interpret } from 'xstate';
import { uuid } from '@thousand/common/dist/utils/uuid';
import { generateCodeFromId } from '../game/models/codeGenerator';

type GameEvents =
  | { type: 'START' }
  | { type: 'ADD_PLAYER'; playerId: ID }
  | { type: 'REMOVE_PLAYER'; playerId: ID }
  | { type: 'NEXT_TURN' };

type GameContext = {
  id: ID;
  code: string;
  players: ID[];
  playerTurn: ID;
};

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

const roundMachine = {
  id: 'round',
  initial: 'running',
  states: {
    running: {},
  },
};

export const gameMachine = createMachine<GameContext, GameEvents>({
  id: 'game',
  initial: 'waiting',
  context: {
    id: '',
    code: '',
    players: [],
    playerTurn: '',
  },
  states: {
    waiting: {
      on: {
        START: [
          { target: 'running', cond: ({ players }) => players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS },
        ],
        ADD_PLAYER: {
          cond: ({ players }, { playerId }) => Boolean(playerId) && !players.find(p => p === playerId),
          actions: assign({ players: ({ players }, { playerId }) => [...players, playerId] }),
        },
      },
    },
    running: {
      entry: assign({
        playerTurn: ctx => ctx.players[0],
      }),
      on: {
        NEXT_TURN: {
          actions: assign({
            playerTurn: ({ players, playerTurn }) =>
              players.indexOf(playerTurn) + 1 < players.length ? players[players.indexOf(playerTurn) + 1] : players[0],
          }),
        },
      },
      ...{
        id: 'round',
        initial: 'running',
        states: {
          running: {},
        },
      },
    },
    over: {
      type: 'final',
    },
  },
});

export const gameService = interpret(gameMachine).onTransition(state => console.log(state.value));
// gameService.start();
// gameService.send({ type: 'START' });
