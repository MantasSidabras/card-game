import { ID } from '@thousand/common/src/types';
import { actions, assign, createMachine, spawn } from 'xstate';
import { generateCodeFromId } from '../../utils/codeGenerator';
import { uuid } from '../../utils/uuid';
import { lobbyMachine } from '../lobby/lobby.machine';
import { createPlayer, PlayerContext } from '../player/player.machine';
import { roundMachine } from '../round/round.machine';
import { GameContext, GameEvents } from './game.types';
// import { AddPlayerEvent, GameContext, GameEvents, GameGuardType, GuardType, RemovePlayerEvent } from './game.types';
export type AddPlayerEvent = { type: 'ADD_PLAYER'; playerId: ID; name?: string };
export type RemovePlayerEvent = { type: 'REMOVE_PLAYER'; playerId: ID };
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

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

const setPlayersAction = assign<GameContext, any>((_, event) => {
  return {
    players: event.data.players,
  };
});

const gameId = uuid();

export const gameMachine = createMachine<GameContext, GameEvents>(
  {
    id: 'game',
    initial: 'waiting',
    context: {
      id: gameId,
      code: generateCodeFromId(gameId),
      players: [],
      winner: null,
    },
    states: {
      waiting: {
        invoke: {
          id: 'lobby',
          src: ({ id, code, players }) => lobbyMachine.withContext({ id, code, players }),
          onDone: {
            target: 'running',
            actions: setPlayersAction,
          },
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
  {}
);
