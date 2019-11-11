import React from 'react'
import MultipleOption from './MultipleOption'

describe('components/MultipleSelect/MultipleOption', () => {
  let wrapper
  const initialMockProps = {
    data: {
      label: 'mockLabel',
      value: 'mockValue'
    },
    selectProps: { selectProps: {} },
    innerProps: {
      onClick: jest.fn()
    },
    isSelected: false,
    isFocused: false
  }

  beforeEach(() => {
    wrapper = mount(<MultipleOption {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-multipleOption__checkbox')).toBeTruthy()
  })

  it('Triggers innerProps.onClick', () => {
    wrapper.find('.c-multipleOption').simulate('click')
    expect(initialMockProps.innerProps.onClick).toHaveBeenCalled()
  })

  it('Checkbox change triggers innerProps.onClick', () => {
    wrapper.find('Checkbox input').simulate('change')
    expect(initialMockProps.innerProps.onClick).toHaveBeenCalled()
  })
})
