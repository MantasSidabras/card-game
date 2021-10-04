import Player from '../../../player/models/Player';
import { PlayerType } from '../../../player/models/Player.types';
import { GameType } from '../Game.types';

export class NoGame implements GameType {
  id: string;
  code: string;
  playerTurn: PlayerType;
  playerIds: string[];
  players: readonly Player[];

  addPlayer(player: Player): void {}
  setPlayers(players: Player[]): void {}
  nextTurn(): void {}
  start(): void {}
}
