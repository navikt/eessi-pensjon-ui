import { Country } from 'components/CountryData/CountryData'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import CountrySelect, { CountrySelectProps } from './CountrySelect'
import * as CountryFilter from './CountryFilter'

const testData = {
  alpha2: 'NO',
  alpha3: 'NOR',
  countryCallingCodes: ['+47'],
  currencies: [{
    currencyLabel: 'Norwegian Krone',
    currencyValue: 'NOK'
  }],
  emoji: '🇳🇴',
  ioc: 'NOR',
  label: 'Norge',
  value: 'NO',
  value3: 'NOR',
  languages: ['nor'],
  name: 'Norway',
  status: 'assigned'
}

describe('components/CountrySelect', () => {
  let wrapper: ReactWrapper
  const initialMockParams: CountrySelectProps<Country> = {
    id: 'react-select-test',
    ariaLabel: 'mockAriaLabel',
    label: 'mockLabel',
    flags: true,
    locale: 'nb',
    includeList: CountryFilter.EEA,
    value: testData,
    onOptionSelected: jest.fn(),
    error: undefined,
    sort: 'scandinaviaFirst'
  }

  it('Renders', () => {
    wrapper = mount(<CountrySelect {...initialMockParams} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Opens and closes', () => {
    wrapper = mount(<CountrySelect {...initialMockParams} />)
    expect(wrapper.find('.c-countryOption').length).toEqual(0)

    wrapper.find('.c-countrySelect__select__dropdown-indicator').hostNodes().simulate('mouseDown', { button: 0 })
    expect(wrapper.find('.c-countryOption').length).toEqual(CountryFilter.EEA.length)

    wrapper.find('.c-countrySelect__select__dropdown-indicator').hostNodes().simulate('mouseDown', { button: 0 })
    expect(wrapper.find('.c-countryOption').length).toEqual(0)

    wrapper.find('.c-countrySelect__select__control').hostNodes().simulate('keyDown', { key: 'ArrowDown' })
    expect(wrapper.find('.c-countryOption').length).toEqual(CountryFilter.EEA.length)

    wrapper.find('.c-countrySelect__select__control').hostNodes().simulate('keyDown', { key: 'Escape' })
    expect(wrapper.find('.c-countryOption').length).toEqual(0)
  })

  it('Returns value when selected', () => {
    wrapper = mount(<CountrySelect {...initialMockParams} />)
    wrapper.find('.c-countrySelect__select__dropdown-indicator').hostNodes().simulate('keyDown', { key: 'ArrowDown' })
    wrapper.find('.c-countryOption').hostNodes().last().simulate('keyDown', { key: 'Enter' })
    expect(initialMockParams.onOptionSelected).toBeCalledWith(testData)
  })

  it('Sorts as scandinaviaFirst', () => {
    wrapper = mount(<CountrySelect {...initialMockParams} />)
    // @ts-ignore
    const sortedOptions = wrapper.find('.c-countrySelect Select').props().options
    expect(sortedOptions[0].label).toEqual('Norge')
    expect(sortedOptions[1].label).toEqual('Sverige')
    expect(sortedOptions[2].label).toEqual('Danmark')
    expect(sortedOptions[3].label).toEqual('Belgia')
  })
})
