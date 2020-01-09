import * as uiActions from 'actions/ui'
import * as types from 'constants/actionTypes'
import { Action } from 'types'

describe('actions/ui', () => {
  it('setHighContrast()', () => {
    const generatedResult: Action = uiActions.setHighContrast()
    expect(generatedResult).toMatchObject({
      type: types.UI_TOGGLE_HIGHCONTRAST
    })
  })
})
