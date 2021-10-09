import { GameGuardType } from '../game/game.types';
import { LobbyGuardType } from './lobby.machine';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

export const minPlayersGuard: LobbyGuardType = ({ players }) => players.length < MIN_PLAYERS;
export const maxPlayersGuard: LobbyGuardType = ({ players }, event) => {
  if (event.type !== 'ADD_PLAYER') return false;
  return Boolean(event.playerId) && !players.find(p => p.id === event.playerId) && players.length < MAX_PLAYERS;
};
