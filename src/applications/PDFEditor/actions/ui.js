import * as types from '../constants/actionTypes'

export const openModal = (modal) => {
  return {
    type: types.UI_MODAL_OPEN,
    payload: modal
  }
}

export const closeModal = () => {
  return {
    type: types.UI_MODAL_CLOSE
  }
}