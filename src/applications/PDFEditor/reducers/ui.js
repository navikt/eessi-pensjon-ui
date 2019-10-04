import * as types from '../constants/actionTypes'

export const initialUiState = {
  modalOpen: false,
  modal: undefined
}

const uiReducer = (state = initialUiState, action = {}) => {
  switch (action.type) {
    case types.UI_MODAL_OPEN:

      return {
        ...state,
        modalOpen: true,
        modal: action.payload
      }

    case types.UI_MODAL_CLOSE:

      return {
        ...state,
        modalOpen: false,
        modal: undefined
      }

    default:

      return state
  }
}

export default uiReducer
