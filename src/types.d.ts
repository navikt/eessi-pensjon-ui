export interface Action {
  type: string;
  payload?: any;
  originalPayload ?: any;
  context ?: any;
}

export type ActionCreator = Function
export type ActionCreators = {[k: string]: ActionCreator}
export type Dispatch = Function
export type State = { [k: string]: any }
export type Labels = {[k in string]? : string}

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
