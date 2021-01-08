import { EventBase, EventEmitArgs, EventListenerParams } from '@thousand/common/src/server-events/event.types';

export interface CommandListenerParams<P, M = any> extends EventEmitArgs {
  payload: P;
  metadata: M;
  emitEvent: (event: EventBase) => void;
}

export type CommandListener<P> = (
  context: CommandListenerParams<P, { clientId: string }>
) => void;

export interface CommandBase extends EventBase {
  emitEvent: (event: EventBase) => void;
}
