import React from 'react'
import Flag from './Flag'

describe('components/Flag', () => {
  const mockInitialProps = {
    label: 'mockLabel',
    country: 'no'
  }

  it('Renders', () => {
    const wrapper = mount(<Flag {...mockInitialProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Sets className from props', () => {
    const wrapper = mount(<Flag {...mockInitialProps} className='TEST-CLASSNAME' />)
    expect(wrapper.find('.c-flag').props().className.includes('TEST-CLASSNAME')).toBeTruthy()
  })

  it('Has proper HTML structure for non-existent flag', () => {
    const wrapper = mount(<Flag {...mockInitialProps} country='aa' />)
    expect(wrapper.find('.c-flag').props()['data-tip']).toEqual('mockLabel')
    expect(wrapper.exists('svg')).toBeFalsy()
  })

  it('Has proper HTML structure for existent flag', () => {
    const wrapper = mount(<Flag {...mockInitialProps} />)
    expect(wrapper.find('.c-flag').props()['data-tip']).toEqual('mockLabel')
    expect(wrapper.render().html()).toEqual('<img alt="mockLabel" src="data:image/svg+xml,%3Csvg xmlns=&apos;http://www.w3.org/2000/svg&apos; viewBox=&apos;0 0 1100 800&apos;%3E %3Crect width=&apos;1100&apos; height=&apos;800&apos; fill=&apos;%23ef2b2d&apos;/%3E %3Crect width=&apos;200&apos; height=&apos;800&apos; x=&apos;300&apos; fill=&apos;%23fff&apos;/%3E %3Crect width=&apos;1100&apos; height=&apos;200&apos; y=&apos;300&apos; fill=&apos;%23fff&apos;/%3E %3Crect width=&apos;100&apos; height=&apos;800&apos; x=&apos;350&apos; fill=&apos;%23002868&apos;/%3E %3Crect width=&apos;1100&apos; height=&apos;100&apos; y=&apos;350&apos; fill=&apos;%23002868&apos;/%3E %3C/svg%3E">')
  })
})
