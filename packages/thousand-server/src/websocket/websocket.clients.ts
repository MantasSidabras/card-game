import { Client } from './websocket.types';
import { ID } from '@thousand/common/src/types';

// export class ClientManager {
//   private _clients = new Map<string, Client>();
//   get clients() {
//     return this._clients;
//   }

//   addClient(client: Client) {
//     this._clients.set(client.id, client);
//   }

//   removeClientById(clientId: string) {
//     this._clients.delete(clientId);
//   }

//   getC() {
//     this._clients.size();
//   }
// }

export const clients = new Map<ID, Client>();
