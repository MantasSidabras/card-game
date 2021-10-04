import { ID } from '@thousand/common/src/types';
import { GameType } from '../../game/models/Game.types';

export interface PlayerType {
  id: ID;
  activeGame: GameType;
}
