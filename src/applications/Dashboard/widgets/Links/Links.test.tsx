import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { Links } from './Links'

jest.mock('react-router-dom', () => ({
  Link: () => (<div className='mock-link' />)
}))

describe('widgets/Links/Links', () => {
  let wrapper: ReactWrapper
  const initialMockProps: any = {}

  beforeEach(() => {
    wrapper = mount(<Links {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-links')).toBeTruthy()
    expect(wrapper.exists('Lenkepanel')).toBeTruthy()
  })
})
