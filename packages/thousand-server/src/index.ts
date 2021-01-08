import express from 'express';
import glob from 'glob';
import http from 'http';
import path from 'path';
import * as WebSocket from 'ws';
import Game from './domain/game/models/Game';
import { uuid } from './utils/uuid';
import { wsHandler } from './websocket/websocket.handler';

glob.sync(path.join(__dirname, 'domain/**/*listener.ts')).forEach(file => {
  require(path.resolve(file));
});

const PORT = process.env.PORT! || 5000;

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const wss = new WebSocket.Server({ server: httpServer });
  wss.on('connection', wsHandler);

  httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
})().catch(err => console.log(err));
