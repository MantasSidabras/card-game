import { useActor, useMachine, useSelector } from '@xstate/react';
import './App.css';
import { inspect } from '@xstate/inspect';
import { gameMachine } from '@thousand/common/dist/domain/game/game.machine';
import { uuid } from '@thousand/common/dist/utils/uuid';
import { useEffect } from 'react';
import { Lobby } from '../lobby/Lobby';
import { toActorRef } from 'xstate/lib/Actor';

inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});

const App = () => {
  const [state, send, service] = useMachine(gameMachine, { devTools: true });
  const isStarted = !['waiting', 'ready'].some(state.matches);

  const lobbyRef = service.children.get('lobby');
  if (state.matches('waiting') && lobbyRef) {
    return <Lobby lobbyRef={lobbyRef} />;
  }
  return (
    <div className="App">
      <h1>Game running</h1>
      <table>
        <tbody>
          {state.context.players.map(({ id, name, score }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{id}</td>
              <td style={{ fontWeight: 'bold' }}>{score}</td>
              <button
                disabled={isStarted}
                onClick={() => {
                  send({ type: 'REMOVE_PLAYER', playerId: id });
                }}
              >
                X
              </button>
            </tr>
          ))}
        </tbody>
      </table>

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
