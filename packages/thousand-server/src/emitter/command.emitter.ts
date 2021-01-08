import { CommandBase, CommandListener } from './command.types';
import { EmitterFacade } from './emitter';
import { EventBase } from '@thousand/common/src/server-events/event.types';

export class CommandEmitterFacade extends EmitterFacade {
  emit<C extends CommandBase>({ type, payload, metadata, emitEvent }: C) {
    return this.eventEmitter.emit(type, { payload, metadata, emitEvent });
  }

  on<E extends EventBase>(
    event: E['type'],
    listener: CommandListener<E['payload']>
  ) {
    return this.eventEmitter.on(event, listener);
  }
}
const commandEmitter = new CommandEmitterFacade();

export default commandEmitter;
