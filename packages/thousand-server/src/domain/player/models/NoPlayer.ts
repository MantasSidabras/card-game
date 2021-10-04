import { GameType } from '../../game/models/Game.types';
import { PlayerType } from './Player.types';

export class NoPlayer implements PlayerType {
  id: string;
  activeGame: GameType;
}
