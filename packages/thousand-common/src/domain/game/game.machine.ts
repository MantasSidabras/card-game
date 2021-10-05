import { ID } from '@thousand/common/src/types';
import { assign, createMachine } from 'xstate';
import { createPlayer, PlayerContext } from '../player/player.machine';
import { roundMachine } from '../round/round.machine';
import { maxPlayersGuard, minPlayersGuard } from './game.guards';
// import { AddPlayerEvent, GameContext, GameEvents, GameGuardType, GuardType, RemovePlayerEvent } from './game.types';
export type AddPlayerEvent = { type: 'ADD_PLAYER'; playerId: ID; name?: string };
export type RemovePlayerEvent = { type: 'REMOVE_PLAYER'; playerId: ID };
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
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

const addPlayerAction = assign<GameContext, any>({
  players: ({ players }, { playerId, name }) => [...players, createPlayer({ id: playerId, name })],
});

const removePlayerAction = assign<GameContext, any>({
  players: ({ players }, { playerId }) => players.filter(p => p.id !== playerId),
});

const roundDoneAction = assign<GameContext, any>((_, event) => {
  return {
    players: event.data.players,
    winner: event.data.players.some(({ id, score }: PlayerContext) => (score >= 1000 ? id : null)),
  };
});
export const gameMachine = createMachine<GameContext, GameEvents>(
  {
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
            cond: 'maxPlayersGuard',
            actions: 'addPlayerAction',
          },
          REMOVE_PLAYER: {
            actions: 'removePlayerAction',
          },
        },
        always: {
          target: 'ready',
          cond: ({ players }) => players.length >= MIN_PLAYERS,
        },
        meta: {
          description: 'waiting for players to join!',
        },
      },
      ready: {
        always: {
          target: 'waiting',
          cond: 'minPlayersGuard',
        },
        on: {
          START: {
            target: 'running',
          },
          ADD_PLAYER: {
            cond: 'maxPlayersGuard',
            actions: 'addPlayerAction',
          },
          REMOVE_PLAYER: {
            actions: 'removePlayerAction',
          },
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
            target: 'running',
            actions: roundDoneAction,
          },
        },
      },
      over: {
        type: 'final',
      },
    },
  },
  {
    guards: {
      minPlayersGuard,
      maxPlayersGuard,
    },
    actions: {
      addPlayerAction,
      removePlayerAction,
    },
  }
);
