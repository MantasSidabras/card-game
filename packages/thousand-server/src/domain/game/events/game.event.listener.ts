import {
  createGame,
  joinGame,
  leaveGame,
  setPlayers,
  setTiles,
  startGame,
} from '@thousand/common/dist/redux-store/game/game.slice';
import eventEmitter from '../../../emitter/event.emitter';
import { reply, replyAll } from '../../../websocket/websocket.util';
import Player from '../../player/models/Player';
import gameManager from '../models/GameManager';
import {
  GameCreatedEvent,
  GameEventType,
  GameJoinedEvent,
  GameLeftEvent,
  GameStartedEvent,
  PlayerJoinedEvent,
  PlayerLeftEvent,
} from './game.event.types';
import { setId } from '@thousand/common/dist/redux-store/player/player.slice';

// eventEmitter.on<GameLeftEvent>(
//   GameEventType.gameLeft,
//   ({ payload: gameId, metadata: { clientId } }) => {
//     const game = gameManager.getGameById(gameId)!;

//     const player = game.removePlayer(clientId);
//     player.leaveGame();
//     reply(clientId, leaveGame());
//     if (!game.players.length) {
//       gameManager.games.delete(game.id);
//     } else {
//       reply(game.playerIds, setPlayers(game.playerIds));
//     }
//   }
// );

// eventEmitter.on<GameJoinedEvent>(
//   GameEventType.gameJoined,
//   ({ payload: gameCode, metadata: { clientId } }) => {
//     const player = playerManager.get(clientId)!;
//     const game = gameManager.getGameByCode(gameCode)!;
//     player.joinGame(game);
//     game.addPlayer(player);
//     reply(clientId, joinGame(gameCode));
//     reply(game.playerIds, setPlayers(game.playerIds));
//   }
// );

// eventEmitter.on<GameStartedEvent>(
//   GameEventType.gameStarted,
//   ({ payload: gameId, metadata: { clientId } }) => {
//     const game = gameManager.getGameById(gameId)!;
//     game.start();
//     reply(game.playerIds, startGame());
//   }
// );
