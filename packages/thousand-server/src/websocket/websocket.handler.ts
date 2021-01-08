import {
  connect,
  disconnect,
} from '../../../thousand-common/dist/commands/game/game.command';
import { executeCommand } from '../MessageHandler/message.handler';
import { uuid } from '../utils/uuid';
import { Client } from './websocket.types';
import * as WebSocket from 'ws';
import { clients } from './websocket.clients';

export const wsHandler = (ws: WebSocket) => {
  const client: Client = { id: uuid(), connection: ws };

  clients.set(client.id, client);
  console.log('connections: ', clients.size);
  executeCommand(connect(), client.id);

  ws.on('message', (message: string) => {
    executeCommand(JSON.parse(message), client.id);
  });
  ws.on('close', () => {
    clients.delete(client.id);
    executeCommand(disconnect(), client.id);
    console.log('connections: ', clients.size);
  });
};
