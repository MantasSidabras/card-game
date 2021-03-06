import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createGame, joinGame, leaveGame, startGame } from "../game/game.slice";
import ScenePicker from "./ScenePicker";

export interface SceneState {
  activeScene: ScenePicker;
}

const initialState: SceneState = {
  activeScene: ScenePicker.preload,
};

const {
  reducer: sceneReducer,
  actions: { changeScene },
} = createSlice({
  name: "scene",
  initialState,
  reducers: {
    leaveGame: (state) => {
      state.activeScene = ScenePicker.menu;
    },
    changeScene: (state, { payload }: PayloadAction<ScenePicker>) => {
      state.activeScene = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(leaveGame, (state) => {
        state.activeScene = ScenePicker.menu;
      })
      .addCase(createGame, (state) => {
        state.activeScene = ScenePicker.lobby;
      })
      .addCase(joinGame, (state) => {
        state.activeScene = ScenePicker.lobby;
      })
      .addCase(startGame, (state) => {
        state.activeScene = ScenePicker.main;
      });
  },
});

export { changeScene };
export default sceneReducer;
