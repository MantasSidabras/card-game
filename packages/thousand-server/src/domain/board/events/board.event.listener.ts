import { setTiles } from '@thousand/common/dist/redux-store/game/game.slice';
import eventEmitter from '../../../emitter/event.emitter';
import { replyAll } from '../../../websocket/websocket.util';
import { game } from '../../game/models/Game';
import { BoardEventTypes, BoardTileSetEvent } from './board.event.types';

eventEmitter.on<BoardTileSetEvent>(
  BoardEventTypes.BOARD_TILE_SET_EVENT,
  ({ payload: { index, value } }) => {
    game.nextTurn();
    game.board.setTile(index, value);

    replyAll(setTiles(game.board.tiles));
  }
);
