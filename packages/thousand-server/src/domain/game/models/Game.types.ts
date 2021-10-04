import { ID } from '@thousand/common/src/types';
import Player from '../../player/models/Player';
import { PlayerType } from '../../player/models/Player.types';

export interface GameType {
  id: ID;
  code: string;
  playerTurn: PlayerType;
  playerIds: ID[];
  players: readonly PlayerType[];

  addPlayer(player: PlayerType): void;
  setPlayers(players: PlayerType[]): void;
  nextTurn(): void;
  start(): void;
}
