import {
  ConnectCommand,
  CreateGameCommand,
  DisconnectCommand,
  GameCommandType,
  JoinGameCommand,
  LeaveGameCommand,
  StartGameCommand,
} from '@thousand/common/dist/commands/game/game.command.types';
import { createGame, leaveGame, setPlayers } from '@thousand/common/dist/redux-store/game/game.slice';
import { setId } from '@thousand/common/dist/redux-store/player/player.slice';
import commandEmitter from '../../../emitter/command.emitter';
import { uuid } from '../../../utils/uuid';
import { reply } from '../../../websocket/websocket.util';
import Player from '../../player/models/Player';
import { playerManager } from '../../player/models/PlayerManager';
import {
  gameCreatedEvent,
  gameJoinedEvent,
  gameLeftEvent,
  gameStartedEvent,
  playerJoinedEvent,
  playerLeftEvent,
} from '../events/game.event';
import gameManager from '../models/GameManager';

commandEmitter.on<ConnectCommand>(GameCommandType.connect, ({ metadata: { clientId } }) => {
  playerManager.create(clientId);
  reply(clientId, setId(clientId));
});

// commandEmitter.on<DisconnectCommand>(
//   GameCommandType.disconnect,
//   ({ metadata: { clientId } }) => {
//     const player = playerManager.get(clientId);
//     if (player?.activeGame) {
//       game.removePlayer(player.id);
//       playerManager.remove(player.id);
//       reply(clientId, leaveGame());
//       if (!game.players.length) {
//         gameManager.games.delete(game.id);
//       } else {
//         reply(game.playerIds, setPlayers(game.playerIds));
//       }
//     }
//   }
// );

commandEmitter.on<CreateGameCommand>(GameCommandType.createGame, ({ emitEvent, metadata: { clientId } }) => {
  const player = playerManager.get(clientId);
  if (player) {
    const game = gameManager.createNewGame();
    game.addPlayer(player);
    reply(clientId, createGame(game.code));
    reply(game.playerIds, setPlayers(game.playerIds));
  }
});

// commandEmitter.on<LeaveGameCommand>(
//   GameCommandType.leaveGame,
//   ({ emitEvent, metadata: { clientId } }) => {
//     const player = playerManager.get(clientId)!;
//     if (player.activeGame) {
//       emitEvent(gameLeftEvent(player.activeGame.id));
//     }
//   }
// );

// commandEmitter.on<JoinGameCommand>(
//   GameCommandType.joinGame,
//   ({ payload: gameCode, emitEvent, metadata: { clientId } }) => {
//     const player = playerManager.get(clientId)!;
//     const game = gameManager.getGameByCode(gameCode);
//     if (game) {
//       if (!player.activeGame) {
//         emitEvent(gameJoinedEvent(gameCode.toUpperCase()));
//       }
//     } else {
//       reply(clientId, { type: 'GAME_NOT_EXIST' });
//     }
//   }
// );

// commandEmitter.on<StartGameCommand>(
//   GameCommandType.startGame,
//   ({ emitEvent, metadata: { clientId } }) => {
//     const player = playerManager.get(clientId)!;
//     const game = player.activeGame;

//     if (game) {
//       if (game.haveEnoughPlayers) {
//         emitEvent(gameStartedEvent(game.id));
//       } else {
//         reply(clientId, {
//           type: 'NOT_ENOUGH_PLAYERS',
//           payload: game.playerIds.length,
//         });
//       }
//     } else {
//       reply(clientId, { type: 'GAME_DOES_NOT_EXIST' });
//     }
//   }
// );
