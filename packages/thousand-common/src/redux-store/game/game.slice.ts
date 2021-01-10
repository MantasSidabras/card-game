import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export interface GameState {
  code: string;
  players: string[];
  grid: string[];
}
const leaveGame = createAction("leaveGame");
const createGame = createAction<string>("createGame");
const joinGame = createAction<string>("joinGame");

const initialState: GameState = {
  code: "",
  players: [],
  grid: Array(9).fill(""),
};

const {
  reducer: gameReducer,
  actions: { setTiles, setPlayers },
} = createSlice({
  name: "game",
  initialState,
  reducers: {
    setTiles: (state, { payload }: PayloadAction<string[]>) => {
      state.grid = payload;
    },
    setPlayers: (state, { payload }: PayloadAction<string[]>) => {
      state.players = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(leaveGame, (state) => {
        state.code = "";
      })
      .addCase(createGame, (state, { payload }) => {
        state.code = payload;
      })
      .addCase(joinGame, (state, { payload }) => {
        state.code = payload;
      });
  },
});

export { setTiles, leaveGame, createGame, joinGame, setPlayers };
export default gameReducer;
