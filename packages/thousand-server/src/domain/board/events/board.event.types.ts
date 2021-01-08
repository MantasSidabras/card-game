export enum BoardEventTypes {
  BOARD_CREATED_EVENT = 'BOARD_CREATED_EVENT',
  BOARD_TILE_SET_EVENT = 'BOARD_TILE_SET_EVENT',
}

interface TilePayload {
  index: number;
  value: string;
}

export interface BoardTileSetEvent {
  type: BoardEventTypes.BOARD_TILE_SET_EVENT;
  payload: TilePayload;
}
