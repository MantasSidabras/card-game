import { EventEmitter } from 'events';
import { EventListener, EventBase } from '@thousand/common/src/server-events/event.types';

export class EmitterFacade {
  protected eventEmitter: EventEmitter;
  constructor(eventEmitter?: EventEmitter) {
    this.eventEmitter = eventEmitter ?? new EventEmitter();
  }

  listenerCount(event: EventBase['type']) {
    return this.eventEmitter.listenerCount(event);
  }
}
