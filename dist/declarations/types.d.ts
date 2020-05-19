import { Action } from 'redux'

export type Labels = {[k in string]? : string}

type MyExtraArg = undefined;
type ThunkResult<R> = ThunkAction<R, State, MyExtraArg, Action>;
type MyThunkDispatch = ThunkDispatch<State, MyExtraArg, Action>;

export interface ErrorPayload<T = any> {
  error: T
}

export interface ActionWithPayload<T = any> extends Action {
  originalPayload?: any;
  context?: any;
  payload: T;
}
