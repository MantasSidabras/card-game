export interface EventEmitArgs<M = any> {
  metadata?: M;
}

export interface EventListenerParams<P, M = any> extends EventEmitArgs {
  payload: P;
  metadata: M;
}

export type EventListener<P> = (
  context: EventListenerParams<P, { clientId: string }>
) => void;



export interface EventBase {
  type: string;
  payload?: any;
  metadata?: any;
}
