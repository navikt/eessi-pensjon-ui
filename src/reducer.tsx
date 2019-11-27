export interface MainReducerState {
  highContrast: boolean
}

export interface Action {
  type: string,
  payload: any
}

const mainReducer = (state: MainReducerState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_HIGH_CONTRAST':
      return {
        ...state,
        highContrast: !state.highContrast
      }
    default:
      return state
  }
}

export const initialState: MainReducerState = {
  highContrast: false
}

export default mainReducer
