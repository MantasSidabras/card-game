export enum GameCommandType {
  incrementCounter = 'INCREMENT_COUNTER',
  updateTile = 'UPDATE_TILE',
  connect = 'CONNECT',
  disconnect = 'DISCONNECT',
  createGame = 'CREATE_GAME',
  leaveGame = 'LEAVE_GAME',
  joinGame = 'JOIN_GAME',
}

export interface ConnectCommand {
  type: GameCommandType.connect;
}

export interface DisconnectCommand {
  type: GameCommandType.disconnect;
}

export interface CreateGameCommand {
  type: GameCommandType.createGame;
}

export interface LeaveGameCommand {
  type: GameCommandType.leaveGame;
}

export interface JoinGameCommand {
  type: GameCommandType.joinGame;
  payload: string;
}
