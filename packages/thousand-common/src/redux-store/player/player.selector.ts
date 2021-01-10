import { RootState } from "../store";

export const playerIdSelector = (state: RootState) => state.player.id;
