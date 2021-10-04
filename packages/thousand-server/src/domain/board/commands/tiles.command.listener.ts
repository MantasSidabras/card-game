import commandEmitter from '../../../emitter/command.emitter';
import { boardTileSetEvent } from '../events/board.event';
// import { game } from '../../game/models/Game';
import { BoardCommandType, UpdateTileCommand } from '@thousand/common/dist/commands/board/board.command.types';

// commandEmitter.on<UpdateTileCommand>(
//   BoardCommandType.updateTile,
//   ({ payload, metadata: { clientId }, emitEvent }) => {
//     const { index, value } = payload;
//     if (game.isRunning && game.playerTurn === clientId) {
//       emitEvent(boardTileSetEvent({ index, value }));
//     }
//   }
// );
