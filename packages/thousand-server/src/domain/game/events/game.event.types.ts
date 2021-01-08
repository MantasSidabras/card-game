import { ID } from '@thousand/common/src/types';

export enum GameEventType {
  playerJoined = 'PLAYER_JOINED',
  playerLeft = 'PLAYER_LEFT',
  gameStarted = 'GAME_STARTED',
  gameCreated = 'GAME_CREATED',
  gameJoined = 'GAME_JOINED',
  gameLeft = 'GAME_LEFT',
}

export interface PlayerJoinedEvent {
  type: GameEventType.playerJoined;
}

export interface PlayerLeftEvent {
  type: GameEventType.playerLeft;
}

export interface GameStartedEvent {
  type: GameEventType.gameStarted;
  payload: ID;
}

export interface GameCreatedEvent {
  type: GameEventType.gameCreated;
  payload: ID;
}

export interface GameLeftEvent {
  type: GameEventType.gameLeft;
  payload: ID; // gameID
}

export interface GameJoinedEvent {
  type: GameEventType.gameJoined;
  payload: string;
}
