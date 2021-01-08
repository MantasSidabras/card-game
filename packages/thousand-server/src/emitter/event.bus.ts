import { EventBase } from '@thousand/common/src/server-events/event.types';
import eventEmitter from './event.emitter';

const emitEvent = (event: EventBase) => {
  //TODO persist event
  console.log('[EVENT] ', event.type);
  eventEmitter.emit(event);
};

export const emitEventCreator = <M>(metadata: M) => {
  return (event: EventBase) => {
    emitEvent({ ...event, metadata });
  };
};

// export default emitEvent;
