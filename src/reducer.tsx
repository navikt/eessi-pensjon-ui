import { Action, State } from 'declarations/types'

export const initialState: State = {
  highContrast: false
}

const mainReducer = (state: State, action: Action): State => {
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

export default mainReducer
