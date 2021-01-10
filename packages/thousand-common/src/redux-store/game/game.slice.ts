import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export interface GameState {
  code: string;
  running: boolean;
  players: string[];
  grid: string[];
}
const leaveGame = createAction("leaveGame");
const createGame = createAction<string>("createGame");
const joinGame = createAction<string>("joinGame");
const startGame = createAction("startGame");

const initialState: GameState = {
  code: "",
  running: false,
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
      })
      .addCase(startGame, (state) => {
        state.running = true;
      });
  },
});

export { setTiles, leaveGame, createGame, joinGame, setPlayers, startGame };
export default gameReducer;
