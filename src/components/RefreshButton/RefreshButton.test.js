import React from 'react'
import RefreshButton from './RefreshButton'

describe('components/RefreshButton', () => {
  const initialMockProps = {
    onRefreshClick: jest.fn(),
    rotating: false,
    labelRefresh: 'mockLabelRefresh'
  }

  it('Renders', () => {
    const wrapper = shallow(<RefreshButton {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    const wrapper = mount(<RefreshButton {...initialMockProps} />)
    expect(wrapper.exists('.c-refreshButton')).toBeTruthy()
    expect(wrapper.find('.c-refreshButton').props().title).toEqual(initialMockProps.labelRefresh)
    wrapper.find('.c-refreshButton a').hostNodes().simulate('click')
    expect(initialMockProps.onRefreshClick).toHaveBeenCalled()
  })
})
