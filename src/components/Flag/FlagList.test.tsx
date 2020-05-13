import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import FlagList, { FlagListProps } from './FlagList'

describe('components/Flag/FlagList', () => {
  let wrapper: ReactWrapper
  const initialMockProps: FlagListProps = {
    items: [{
      label: 'Norge',
      country: 'NO'
    }, {
      label: 'Sverige',
      country: 'SE'
    }, {
      label: 'Danmark',
      country: 'DK'
    }],
    overflowLimit: 2,
    locale: 'nb',
    wrapper: true
  }

  it('Renders', () => {
    wrapper = mount(<FlagList {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Displays correct number of flags', () => {
    wrapper = mount(<FlagList {...initialMockProps} />)
    expect(wrapper.find('Flag').length).toEqual(2)
    expect(wrapper.exists('Normaltekst')).toBeTruthy()
    expect(wrapper.find('Normaltekst').render().text()).toEqual('+1')

    wrapper.setProps({ overflowLimit: 3 })
    expect(wrapper.find('Flag').length).toEqual(3)
    expect(wrapper.exists('Normaltekst')).toBeFalsy()
  })

  it('Assigns props to Flag', () => {
    wrapper = mount(<FlagList {...initialMockProps} />)
    wrapper.find('Flag').forEach((flag, index) => {
      // @ts-ignore
      expect(flag.props().country).toEqual(initialMockProps.items[index].country)
    })
  })
})
