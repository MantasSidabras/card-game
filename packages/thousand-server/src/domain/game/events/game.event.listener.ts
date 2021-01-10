import {
  createGame,
  joinGame,
  leaveGame,
  setTiles,
} from '@thousand/common/dist/redux-store/game/game.slice';
import eventEmitter from '../../../emitter/event.emitter';
import { reply, replyAll } from '../../../websocket/websocket.util';
import Player from '../../player/models/Player';
import playerManager from '../../player/models/PlayerManager';
import { game } from '../models/Game';
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

eventEmitter.on<PlayerJoinedEvent>(
  GameEventType.playerJoined,
  ({ metadata: { clientId } }) => {
    const player = new Player(clientId);
    playerManager.set(clientId, player);
    game.addPlayer(player);
    replyAll({ type: 'PLAYERS_COUNT', payload: game.players.length });
  }
);

eventEmitter.on<PlayerLeftEvent>(
  GameEventType.playerLeft,
  ({ metadata: { clientId } }) => {
    playerManager.delete(clientId);
  }
);

eventEmitter.on<GameLeftEvent>(
  GameEventType.gameLeft,
  ({ payload: gameId, metadata: { clientId } }) => {
    const game = gameManager.getGameById(gameId)!;

    const player = game.removePlayer(clientId);
    player.leaveGame();
    reply(clientId, leaveGame());
    if (!game.players.length) {
      gameManager.games.delete(game.id);
    } else {
      reply(game.playerIds, { type: 'PLAYERS', payload: game.playerIds });
    }
  }
);

eventEmitter.on<GameCreatedEvent>(
  GameEventType.gameCreated,
  ({ payload: gameId, metadata: { clientId } }) => {
    const game = gameManager.createNewGame(gameId);
    const player = playerManager.get(clientId)!;
    player.joinGame(game);
    game.addPlayer(player);
    reply(clientId, createGame(game.code));
    // TODO create redux action
    reply(game.playerIds, { type: 'GAME_JOINED', payload: game.id });
  }
);

eventEmitter.on<GameJoinedEvent>(
  GameEventType.gameJoined,
  ({ payload: gameCode, metadata: { clientId } }) => {
    const player = playerManager.get(clientId)!;
    const game = gameManager.getGameByCode(gameCode)!;
    player.joinGame(game);
    game.addPlayer(player);
    reply(clientId, joinGame(gameCode));
    reply(game.playerIds, { type: 'PLAYERS', payload: game.playerIds });
  }
);

eventEmitter.on<GameStartedEvent>(
  GameEventType.gameStarted,
  ({ payload: gameId, metadata: { clientId } }) => {
    game.start();
    replyAll(setTiles(game.board.tiles));
  }
);
