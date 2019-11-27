import React from 'react'
import CountryOption from './CountryOption'

describe('CountryOption Rendering', () => {
  const countrySelectProps = { selectProps: { type: 'country' } }
  const currencySelectProps = { selectProps: { type: 'currency' } }
  let wrapper

  const initialMockProps = {
    value: undefined,
    label: undefined,
    selectProps: {
      selectProps: {}
    },
    data: {
      label: 'mockLabel',
      value: 'mockValue',
      currencyLabel: 'mockCurrencyLabel',
      currencyValue: 'mockCurrencyValue'
    },
    innerProps: {},
    isSelected: false,
    isFocused: false
  }

  beforeEach(() => {
    wrapper = shallow(<CountryOption {...initialMockProps} />)
  })

  it('Renders correctly', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    wrapper.setProps({ selectProps: countrySelectProps })
    expect(wrapper.find('span').text()).toEqual('mockLabel')
    wrapper.setProps({ selectProps: currencySelectProps })
    expect(wrapper.find('span').text()).toEqual('mockCurrencyValue - mockCurrencyLabel')
  })
})
