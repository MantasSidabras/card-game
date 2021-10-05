import { useMachine } from '@xstate/react';
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
  // return null;
  return (
    <div className="App">
      <header className="App-header">State controller</header>
      <table>
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
      </table>
      <button
        disabled={isStarted}
        onClick={async () => {
          const name = await fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
              const { first, last } = data.results[0].name;
              return `${first}_${last}`;
            })
            .catch(() => '');

          send({
            type: 'ADD_PLAYER',
            playerId: uuid(),
            name,
          });
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
