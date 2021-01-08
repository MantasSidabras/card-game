import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export interface GameState {
  code: string;
  numberOfPlayers: number;
  grid: string[];
}
const leaveGame = createAction('leaveGame');
const createGame = createAction<string>('createGame');

const initialState: GameState = {
  code: '',
  numberOfPlayers: 0,
  grid: Array(9).fill(''),
};

const {
  reducer: gameReducer,
  actions: { setTiles },
} = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTiles: (state, { payload }: PayloadAction<string[]>) => {
      state.grid = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(leaveGame, (state) => {
        state.code = '';
      })
      .addCase(createGame, (state, { payload }) => {
        state.code = payload;
      });
  },
});

export { setTiles, leaveGame, createGame };
export default gameReducer;
