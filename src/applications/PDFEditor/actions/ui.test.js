import * as types from '../constants/actionTypes'
import * as uiActions from './ui'

describe('actions/ui', () => {
  it('openModal()', () => {
    const mockModal = { foo: 'bar' }
    const generatedResult = uiActions.openModal(mockModal)
    expect(generatedResult).toMatchObject({
      type: types.UI_MODAL_OPEN,
      payload: mockModal
    })
  })

  it('closeModal()', () => {
    const generatedResult = uiActions.closeModal()
    expect(generatedResult).toMatchObject({
      type: types.UI_MODAL_CLOSE
    })
  })
})
