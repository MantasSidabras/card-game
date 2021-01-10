import { RootState } from "../store";

export const codeSelector = (state: RootState) => state.game.code;
export const playersSelector = (state: RootState) => state.game.players;
