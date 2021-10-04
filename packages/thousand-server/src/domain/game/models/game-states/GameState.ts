import Player from "../../../player/models/Player";

export interface GameState {
  value: string;
  start: () => GameState;
  end: () => GameState;
  nextTurn: () => GameState;
  addPlayer: (player: Player) => GameState;
}
