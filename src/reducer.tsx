import { Action, Reducer } from 'redux'
import * as types from 'constants/actionTypes'

export const initialState: State = {
  highContrast: false
}

export interface State {
  highContrast: boolean;
}

const mainReducer: Reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.UI_TOGGLE_HIGHCONTRAST:
      return {
        ...state,
        highContrast: !state.highContrast
      }
    default:
      return state
  }
}

export default mainReducer
