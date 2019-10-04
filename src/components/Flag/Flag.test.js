import React from 'react'
import Flag from './Flag'

describe('components/Flag', () => {
  const mockInitialProps = {
    label: 'mockLabel',
    country: 'NO'
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
    expect(wrapper.find('.c-flag').props().title).toEqual('mockLabel')
    expect(wrapper.exists('svg')).toBeFalsy()
  })

  it('Has proper HTML structure for nexistent flag', () => {
    const wrapper = mount(<Flag {...mockInitialProps} />)
    expect(wrapper.find('.c-flag').props().title).toEqual('mockLabel')
    expect(wrapper.render().html()).toEqual('<no.svg></no.svg>')
  })
})
