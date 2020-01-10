import PT from 'prop-types'

export interface Action {
  type: string;
  payload?: any;
  originalPayload ?: any;
  context ?: any;
}

export type ActionCreator = Function
export const ActionCreatorPropType = PT.func
export type ActionCreators = {[k: string]: ActionCreator}
export const ActionCreatorsPropType = PT.objectOf(ActionCreatorPropType.isRequired)
export type Dispatch = Function
export type State = { [k: string]: any }
export type Labels = {[k in string]? : string}
export const LabelsPropType = PT.objectOf(PT.string.isRequired)

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
