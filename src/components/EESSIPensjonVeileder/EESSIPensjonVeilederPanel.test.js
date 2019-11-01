import React from 'react'
import EESSIPensjonVeilederPanel from './EESSIPensjonVeilederPanel'

describe('EESSIPensjonVeilederPanel Rendering', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<EESSIPensjonVeilederPanel><div className='child' /></EESSIPensjonVeilederPanel>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Render child components', () => {
    const wrapper = shallow(
      <EESSIPensjonVeilederPanel>
        <div id='1' />
        <div id='2' />
        <div id='3' />
        <div id='4' />
      </EESSIPensjonVeilederPanel>)
    expect(wrapper.find('Veilederpanel').children().length).toEqual(4)
    expect(wrapper.exists('div[id="1"]')).toBeTruthy()
    expect(wrapper.exists('div[id="2"]')).toBeTruthy()
    expect(wrapper.exists('div[id="3"]')).toBeTruthy()
    expect(wrapper.exists('div[id="4"]')).toBeTruthy()
    expect(wrapper.exists('div[id="5"]')).toBeFalsy()
  })

  it('Render closeButton', () => {
    const wrapper = shallow(
      <EESSIPensjonVeilederPanel closeButton={false}>
        <div id='1' />
      </EESSIPensjonVeilederPanel>)

    let child = wrapper.find('Veilederpanel')

    expect(child.exists('a[href="#close"]')).toBeFalsy()

    wrapper.setProps({ closeButton: true })
    child = wrapper.find('Veilederpanel')

    expect(child.exists('a[href="#close"]')).toBeTruthy()
  })
})

describe('EESSIPensjonVeilederPanel button', () => {
  it('Renders null when button is clicked', () => {
    const wrapper = shallow(
      <EESSIPensjonVeilederPanel closeButton>
        <div id='1' />
      </EESSIPensjonVeilederPanel>
    )

    const mockEvent = { preventDefault: () => {}, stopPropagation: () => {} }

    expect(wrapper.isEmptyRender()).toBeFalsy()

    wrapper.find('a').simulate('click', mockEvent)

    expect(wrapper.isEmptyRender()).toBeTruthy()
  })
})
