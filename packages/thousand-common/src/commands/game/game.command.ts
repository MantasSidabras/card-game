import {
  ConnectCommand,
  CreateGameCommand,
  DisconnectCommand,
  GameCommandType,
  JoinGameCommand,
  LeaveGameCommand,
  StartGameCommand,
} from "./game.command.types";

export const connect = (): ConnectCommand => ({
  type: GameCommandType.connect,
});
export const disconnect = (): DisconnectCommand => ({
  type: GameCommandType.disconnect,
});
export const createGame = (): CreateGameCommand => ({
  type: GameCommandType.createGame,
});
export const leaveGame = (): LeaveGameCommand => ({
  type: GameCommandType.leaveGame,
});
export const joinGame = (payload: string): JoinGameCommand => ({
  type: GameCommandType.joinGame,
  payload,
});

export const startGame = (): StartGameCommand => ({
  type: GameCommandType.startGame,
});
