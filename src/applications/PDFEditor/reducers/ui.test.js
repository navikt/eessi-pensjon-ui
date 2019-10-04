import uiReducer, { initialUiState } from './ui.js'
import * as types from '../constants/actionTypes'

describe('reducers/ui', () => {
  it('UI_MODAL_OPEN', () => {
    expect(
      uiReducer(initialUiState, {
        type: types.UI_MODAL_OPEN,
        payload: 'something'
      })
    ).toEqual({
      ...initialUiState,
      modalOpen: true,
      modal: 'something'
    })
  })

  it('UI_MODAL_CLOSE', () => {
    expect(
      uiReducer({
        ...initialUiState,
        modalOpen: true,
        modal: 'something'
      }, {
        type: types.UI_MODAL_CLOSE
      })
    ).toEqual(initialUiState)
  })
})
