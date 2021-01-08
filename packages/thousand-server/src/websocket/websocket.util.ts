import { clients } from './websocket.clients';

export const broadcast = (message: string) => {
  clients.forEach(({ connection }) => {
    connection.send(message);
  });
};

const replyOne = (clientId: string, msg: any) => {
  const client = clients.get(clientId);
  if (client) {
    client.connection.send(JSON.stringify(msg));
  } else {
    console.error('[REPLY ERROR] client is missing id: ', clientId);
  }
};

export const reply = (clientIds: string | string[], msg: any) => {
  if (typeof clientIds === 'string') {
    replyOne(clientIds, msg);
  } else {
    clientIds.forEach(clientId => replyOne(clientId, msg));
  }
};

export const replyAll = (msg: any) => broadcast(JSON.stringify(msg));
