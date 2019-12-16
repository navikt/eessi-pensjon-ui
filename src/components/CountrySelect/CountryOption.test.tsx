import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import CountryOption, { CountryOptionProps } from './CountryOption'

describe('CountryOption Rendering', () => {
  const countrySelectProps = { selectProps: { type: 'country' } }
  const currencySelectProps = { selectProps: { type: 'currency' } }
  let wrapper: ReactWrapper

  // @ts-ignore
  const initialMockProps: CountryOptionProps = {
    label: 'mockLabel',
    selectProps: {
      selectProps: {}
    },
    data: {
      label: 'mockLabel',
      value: 'mockValue',
      currencyLabel: 'mockCurrencyLabel',
      currencyValue: 'mockCurrencyValue'
    },
    isSelected: false,
    isFocused: false,
    getStyles: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<CountryOption {...initialMockProps} />)
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
