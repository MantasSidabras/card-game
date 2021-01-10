import {
  ConnectCommand,
  CreateGameCommand,
  DisconnectCommand,
  GameCommandType,
  JoinGameCommand,
  LeaveGameCommand,
  StartGameCommand,
} from '@thousand/common/dist/commands/game/game.command.types';
import { emit } from 'process';
import commandEmitter from '../../../emitter/command.emitter';
import { uuid } from '../../../utils/uuid';
import { reply } from '../../../websocket/websocket.util';
import playerManager from '../../player/models/PlayerManager';
import {
  gameCreatedEvent,
  gameJoinedEvent,
  gameLeftEvent,
  gameStartedEvent,
  playerJoinedEvent,
  playerLeftEvent,
} from '../events/game.event';
import { game } from '../models/Game';
import gameManager from '../models/GameManager';

commandEmitter.on<ConnectCommand>(
  GameCommandType.connect,
  ({ emitEvent, metadata: { clientId } }) => {
    emitEvent(playerJoinedEvent());
    if (!game.isRunning) {
      if (playerManager.size > 1) {
        emitEvent(gameStartedEvent(game.id));
      }
    }
  }
);

commandEmitter.on<DisconnectCommand>(
  GameCommandType.disconnect,
  ({ emitEvent, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    if (player.activeGame) {
      emitEvent(gameLeftEvent(player.activeGame.id));
    }
    emitEvent(playerLeftEvent());
  }
);

commandEmitter.on<CreateGameCommand>(
  GameCommandType.createGame,
  ({ emitEvent, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    if (!player.activeGame) {
      emitEvent(gameCreatedEvent(uuid()));
    }
  }
);

commandEmitter.on<LeaveGameCommand>(
  GameCommandType.leaveGame,
  ({ emitEvent, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    if (player.activeGame) {
      emitEvent(gameLeftEvent(player.activeGame.id));
    }
  }
);

commandEmitter.on<JoinGameCommand>(
  GameCommandType.joinGame,
  ({ payload: gameCode, emitEvent, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    const game = gameManager.getGameByCode(gameCode);
    if (game) {
      if (!player.activeGame) {
        emitEvent(gameJoinedEvent(gameCode.toUpperCase()));
      }
    } else {
      reply(clientId, { type: 'GAME_NOT_EXIST' });
    }
  }
);

commandEmitter.on<StartGameCommand>(
  GameCommandType.startGame,
  ({ emitEvent, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    const game = player.activeGame;
    console.log('active game: ', game);

    if (game) {
      emitEvent(gameStartedEvent(game.id));
    }
  }
);
