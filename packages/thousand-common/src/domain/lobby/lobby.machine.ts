import { ID } from '@thousand/common/src/types';
import { assign, createMachine, actions } from 'xstate';
import { maxPlayersGuard, minPlayersGuard } from './lobby.guards';
import { GameContext } from '../game/game.types';
import { createPlayer, PlayerContext } from '../player/player.machine';
import { roundMachine } from '../round/round.machine';

export type AddPlayerEvent = { type: 'ADD_PLAYER'; playerId: ID; name?: string };
export type RemovePlayerEvent = { type: 'REMOVE_PLAYER'; playerId: ID };

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

export type LobbyEvents = { type: 'START' } | AddPlayerEvent | RemovePlayerEvent;

export type LobbyContext = Pick<GameContext, 'id' | 'code' | 'players'>;

export type LobbyType<C, E> = (context: C, event: E) => boolean;
export type LobbyGuardType = LobbyType<LobbyContext, LobbyEvents>;

const addPlayerAction = assign<LobbyContext, any>({
  players: ({ players }, { playerId, name }) => [...players, createPlayer({ id: playerId, name })],
});

const removePlayerAction = assign<LobbyContext, any>({
  players: ({ players }, { playerId }) => players.filter(p => p.id !== playerId),
});

const roundDoneAction = assign<GameContext, any>((_, event) => {
  return {
    players: event.data.players,
    winner: event.data.players.some(({ id, score }: PlayerContext) => (score >= 1000 ? id : null)),
  };
});

export const lobbyMachine = createMachine<LobbyContext, LobbyEvents>(
  {
    id: 'lobby',
    initial: 'waiting',
    context: {
      id: '',
      code: '',
      players: [],
    },
    states: {
      waiting: {
        on: {
          ADD_PLAYER: {
            cond: 'maxPlayersGuard',
            actions: ['addPlayerAction', ({ players }) => actions.sendParent({ type: 'SET_PLAYERS', players })],
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
        entry: assign({}),
        always: {
          target: 'waiting',
          cond: 'minPlayersGuard',
        },
        on: {
          START: {
            target: 'finished',
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
      finished: {
        type: 'final',
        data: {
          players: ({ players }: LobbyContext) => players,
        },
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
