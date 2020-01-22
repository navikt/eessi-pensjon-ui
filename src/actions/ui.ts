import * as types from 'constants/actionTypes'
import { Action } from 'redux'

export const setHighContrast = (): Action => ({
  type: types.UI_TOGGLE_HIGHCONTRAST
})
