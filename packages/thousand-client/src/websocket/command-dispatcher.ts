import { EventBase } from '@thousand/common/dist/server-events/event.types';
import { socket } from './websocket.util';

interface Dispatcher {
  send: <M extends string>(message: M) => void;
}

class CommandDispatcherFacade {
  private dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  send<C extends EventBase>(message: C) {
    const messageText = JSON.stringify(message);
    this.dispatcher.send(messageText);
  }
}

const commandDispatcher = new CommandDispatcherFacade(socket);

export default commandDispatcher;
