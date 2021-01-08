import commandEmitter from '../emitter/command.emitter';
import { emitEventCreator } from '../emitter/event.bus';
import { EventBase } from '@thousand/common/src/server-events/event.types';

export const executeCommand = async <C extends EventBase>(
  command: C,
  clientId: string
) => {
  try {
    console.log('[COMMAND] \t', command.type);
    const metadata = { clientId };
    commandEmitter.emit({
      ...command,
      metadata,
      emitEvent: emitEventCreator(metadata),
    });
  } catch (err) {
    console.error(err);
  }
};
