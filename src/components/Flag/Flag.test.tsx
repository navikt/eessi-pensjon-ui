import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import Flag from './Flag'

describe('components/Flag', () => {
  let wrapper: ReactWrapper
  const mockInitialProps = {
    label: 'mockLabel',
    country: 'no'
  }

  it('Renders', () => {
    wrapper = mount(<Flag {...mockInitialProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Sets className from props', () => {
    wrapper = mount(<Flag {...mockInitialProps} className='TEST-CLASSNAME' />)
    expect(wrapper.find('.c-flag').props().className!.includes('TEST-CLASSNAME')).toBeTruthy()
  })

  it('Has proper HTML structure for non-existent flag', () => {
    wrapper = mount(<Flag {...mockInitialProps} country='aa' />)
    // @ts-ignore
    expect(wrapper.exists('svg')).toBeFalsy()
  })

  it('Has proper HTML structure for existent flag', () => {
    wrapper = mount(<Flag {...mockInitialProps} />)
    // @ts-ignore
    expect(wrapper.render().html()).toEqual('<img alt="mockLabel" src="no.svg">')
  })
})
