import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import CountryValue, { CountryValueProps } from './CountryValue'

describe('components/CountrySelect/CountryValue', () => {
  let wrapper: ReactWrapper
  // @ts-ignore
  const initialMockProps: CountryValueProps = {
    selectProps: { selectProps: { type: 'country' } },
    data: {
      value: 'NO',
      value3: 'NOR',
      label: 'Norway',
      currencyValue: 'NOK',
      currencyLabel: 'Norsk Krone'
    }
  }

  it('Renders', () => {
    wrapper = mount(<CountryValue {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure: country select', () => {
    wrapper = mount(<CountryValue {...initialMockProps} />)
    expect(wrapper.children().hostNodes().length).toEqual(1)
    expect(wrapper.render().text()).toEqual('Norway')
  })

  it('Has proper HTML structure: currency select', () => {
    wrapper = mount(<CountryValue {...initialMockProps} selectProps={{ selectProps: { type: 'currency' } }} />)
    expect(wrapper.children().hostNodes().length).toEqual(1)
    expect(wrapper.render().text()).toEqual('NOK - Norsk Krone')
  })
})
