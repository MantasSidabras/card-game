import { EmitterFacade } from './emitter';
import { EventBase, EventListener } from '@thousand/common/src/server-events/event.types';

export class EventEmitterFacade extends EmitterFacade {
  emit<E extends EventBase>({ type, payload, metadata }: E) {
    return this.eventEmitter.emit(type, { payload, metadata });
  }

  on<E extends EventBase>(
    event: E['type'],
    listener: EventListener<E['payload']>
  ) {
    return this.eventEmitter.on(event, listener);
  }
}
const eventEmitter = new EventEmitterFacade();

export default eventEmitter;
