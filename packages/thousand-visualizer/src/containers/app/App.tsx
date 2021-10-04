import { useMachine } from '@xstate/react';
import React, { useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { inspect } from '@xstate/inspect';
import { gameMachine } from '@thousand/common/dist/domain/game/game.machine';
import { uuid } from '@thousand/common/dist/utils/uuid';

inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});

const App = () => {
  const [state, send] = useMachine(gameMachine, { devTools: true });
  const isStarted = !['waiting', 'ready'].some(state.matches);
  return (
    <div className="App">
      <header className="App-header">State controller</header>
      <table>
        {state.context.players.map(p => (
          <tr>
            {p}{' '}
            <button
              disabled={isStarted}
              onClick={() => {
                send({ type: 'REMOVE_PLAYER', playerId: p });
              }}
            >
              X
            </button>
          </tr>
        ))}
      </table>
      <button
        disabled={isStarted}
        onClick={() => {
          send({ type: 'ADD_PLAYER', playerId: uuid() });
        }}
      >
        ADD_PLAYER
      </button>
      <button disabled={isStarted} onClick={() => send('START')}>
        START
      </button>
      <button
        disabled={isStarted}
        onClick={() => {
          send({ type: 'ADD_PLAYER', playerId: uuid() });
          send({ type: 'ADD_PLAYER', playerId: uuid() });
          send({ type: 'ADD_PLAYER', playerId: uuid() });
          send('START');
        }}
      >
        PLAY
      </button>
    </div>
  );
};

export default App;
