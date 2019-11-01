const mainReducer = (state, action) => {
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

export const initialState = {
  highContrast: false
}

export default mainReducer
