import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  username: string;
  level: number;
  queryResult: string;
}

const initialState: PlayerState = {
  username: '',
  level: 0,
  queryResult: '',
};

const {
  reducer: playerReducer,
  actions: { levelup, setName, setResult, setLevel },
} = createSlice({
  name: 'player',
  initialState,
  reducers: {
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

export { levelup, setName, setResult, setLevel };
export default playerReducer;
