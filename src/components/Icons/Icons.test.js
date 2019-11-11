import React from 'react'
import Icons, { availableIcons } from './Icons'

describe('components/Icons/Icons', () => {
  it('Renders icons', () => {
    let iconWrapper = mount(<Icons kind='non-existing-icon' />)
    expect(iconWrapper.isEmptyRender()).toBeTruthy()

    availableIcons.forEach(icon => {
      iconWrapper = mount(<Icons kind={icon} />)
      expect(iconWrapper.isEmptyRender()).toBeFalsy()
    })
  })
})
