import WebSocket from 'ws';

export interface Client {
  id: string;
  connection: WebSocket;
}
