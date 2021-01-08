import { ID } from '@thousand/common/src/types';
import {
  GameCreatedEvent,
  GameEventType,
  GameJoinedEvent,
  GameLeftEvent,
  GameStartedEvent,
  PlayerJoinedEvent,
  PlayerLeftEvent,
} from './game.event.types';

export const playerJoinedEvent = (): PlayerJoinedEvent => ({
  type: GameEventType.playerJoined,
});

export const playerLeftEvent = (): PlayerLeftEvent => ({
  type: GameEventType.playerLeft,
});

export const gameCreatedEvent = (payload: ID): GameCreatedEvent => ({
  type: GameEventType.gameCreated,
  payload,
});

export const gameStartedEvent = (payload: ID): GameStartedEvent => ({
  type: GameEventType.gameStarted,
  payload,
});

export const gameJoinedEvent = (payload: string): GameJoinedEvent => ({
  type: GameEventType.gameJoined,
  payload,
});

export const gameLeftEvent = (payload: ID): GameLeftEvent => ({
  type: GameEventType.gameLeft,
  payload,
});
