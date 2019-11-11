import React from 'react'
import MultipleValueRemove from './MultipleValueRemove'

describe('components/MultipleSelect/MultipleValueRemove', () => {
  let wrapper

  const initialMockProps = {}

  beforeEach(() => {
    wrapper = mount(<MultipleValueRemove {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.find('c-multipleSelect-multipleValueRemove')).toBeTruthy()
  })
})
