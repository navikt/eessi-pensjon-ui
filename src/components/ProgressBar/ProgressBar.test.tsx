import { mount } from 'enzyme'
import React from 'react'
import ProgressBar, { ProgressBarProps } from './ProgressBar'

describe('components/ProgressBar', () => {
  const initialMockProps: ProgressBarProps = {
    now: 50
  }

  it('Renders', () => {
    const wrapper = mount(<ProgressBar {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    const wrapper = mount(<ProgressBar {...initialMockProps} />)
    expect(wrapper.exists('.c-progressbar')).toBeTruthy()
  })
})
