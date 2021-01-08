import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import gameReducer from './game/game.slice';
import playerReducer from './player/player.slice';
import sceneReducer from './scene/scene.slice';

const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  scene: sceneReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const logger = createLogger({
  collapsed: true,
});

const middlewares = [...getDefaultMiddleware(), logger];
const appliedMiddlewares = applyMiddleware<DispatchFunctionType, RootState>(...middlewares);
const enhancers = [appliedMiddlewares];
type DispatchFunctionType = ThunkDispatch<RootState, undefined, AnyAction>;
const store = configureStore({
  reducer: rootReducer,
  enhancers,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
