import * as types from '../constants/actionTypes'
import { Action } from './actions' // eslint-disable-line

export const setHighContrast = (): Action<void> => {
  return {
    type: types.UI_TOGGLE_HIGHCONTRAST
  }
}
