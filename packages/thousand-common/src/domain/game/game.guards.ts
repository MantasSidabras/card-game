import { GameGuardType } from './game.types';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

export const minPlayersGuard: GameGuardType = ({ players }) => players.length < MIN_PLAYERS;
export const maxPlayersGuard: GameGuardType = ({ players }, event) => {
  if (event.type !== 'ADD_PLAYER') return false;
  return Boolean(event.playerId) && !players.find(p => p.id === event.playerId) && players.length < MAX_PLAYERS;
};
