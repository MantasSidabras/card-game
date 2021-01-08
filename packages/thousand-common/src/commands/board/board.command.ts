import { BoardCommandType, TilePayload } from './board.command.types';

export const updateTile = (payload: TilePayload) => ({ type: BoardCommandType.updateTile, payload });
