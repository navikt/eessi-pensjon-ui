export interface Action {
  type: string;
  payload?: any;
  originalPayload ?: any;
  context ?: any;
}

export type ActionCreator = (...args: any[]) => void;
export type ActionCreators = {[k: string]: ActionCreator}
export type Dispatch = Function
export interface State { [k: string]: any }
export type Reducer = (s: State, a: Action) => State;
export type Labels = {[k in string]? : string}

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
