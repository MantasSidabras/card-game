import { RootState } from '../store';

export const codeSelector = (state: RootState) => state.game.code;
