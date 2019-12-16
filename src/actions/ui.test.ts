import * as uiActions from 'actions/ui'
import * as types from 'constants/actionTypes'

describe('actions/ui', () => {
  it('setHighContrast()', () => {
    const generatedResult = uiActions.setHighContrast()
    expect(generatedResult).toMatchObject({
      type: types.UI_TOGGLE_HIGHCONTRAST
    })
  })
})
