import { RootState } from '../store';

export const activeSceneSelector = (state: RootState) => state.scene.activeScene;
