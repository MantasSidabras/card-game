import { BoardTileSetEvent, BoardEventTypes } from './board.event.types';

export const boardTileSetEvent = (
  payload: BoardTileSetEvent['payload']
): BoardTileSetEvent => ({
  type: BoardEventTypes.BOARD_TILE_SET_EVENT,
  payload,
});
