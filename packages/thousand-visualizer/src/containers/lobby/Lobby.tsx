import { GameContext } from '@thousand/common/dist/domain/game/game.types';
import { LobbyContext, LobbyEvents } from '@thousand/common/dist/domain/lobby/lobby.machine';
import { uuid } from '@thousand/common/dist/utils/uuid';
import { useActor, useSelector, useService } from '@xstate/react';
import { Actor, ActorRef, EventObject, Interpreter } from 'xstate';

type LobbyProps = {
  lobbyRef: ActorRef<any, any>;
};

export const Lobby: React.FC<LobbyProps> = ({ lobbyRef }) => {
  const [state, send] = useActor(lobbyRef!);
  const context: LobbyContext = state.context;
  if (!lobbyRef) {
    return <p>Loading...</p>;
  }
  console.log(state);

  return (
    <div>
      <h1>Waiting in lobby</h1>
      <button
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
      <button onClick={() => send('START')}>START</button>
      <table>
        <tbody>
          {context.players.map(({ id, name, score }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{id}</td>
              <td style={{ fontWeight: 'bold' }}>{score}</td>
              <button
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
    </div>
  );
};
