import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID } from "../../types";

export interface PlayerState {
  id: ID;
  username: string;
  level: number;
  queryResult: string;
}

const initialState: PlayerState = {
  id: "",
  username: "",
  level: 0,
  queryResult: "",
};

const { reducer: playerReducer, actions } = createSlice({
  name: "player",
  initialState,
  reducers: {
    setId: (state, { payload }: PayloadAction<ID>) => {
      state.id = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
    levelup: (state) => {
      state.level += 1;
    },
    setLevel: (state, { payload }: PayloadAction<number>) => {
      state.level = payload;
    },
    setResult: (state, { payload }: PayloadAction<string>) => {
      state.queryResult = payload;
    },
  },
});

export const { levelup, setId, setName, setResult, setLevel } = actions;
export default playerReducer;
