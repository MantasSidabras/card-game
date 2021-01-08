export enum BoardCommandType {
  updateTile = 'UPDATE_TILE_COMMAND',
}

export interface TilePayload {
  index: number;
  value: string;
}

export interface UpdateTileCommand {
  type: BoardCommandType.updateTile;
  payload: TilePayload;
}
